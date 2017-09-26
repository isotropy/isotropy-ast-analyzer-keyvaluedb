import { capture, Match, Skip, builtins as $ } from "chimpanzee";
import composite from "../../chimpanzee-utils/composite";
import * as expressions from "../../chimpanzee-utils/expressions";
import * as arrowFunctions from "../../chimpanzee-utils/arrow-functions";
import { isMatchOrValue } from "../../chimpanzee-utils/results";
import util from "util";

function memberOnFilterParam(path) {
  return (
    path.type === "MemberExpression" &&
    path.get("object").type === "Identifier" &&
    path.get("object").node.name === filterParam.node.name
  );
}

function getOperator(op, flipOperator) {
  const map = [
    [["==", "==="], ["$eq"]],
    [[">"], ["$gt", "$lte"]],
    [[">="], ["$gte", "$lt"]],
    [["<="], ["$lte", "$gt"]],
    [["<"], ["$lt", "$gte"]],
    [["!=", "!=="], ["$ne"]]
  ];
  const match = map.find(([jsOperators, dbOperators]) => jsOperators.includes(op.node));
  return match ? (!flipOperator ? match[1][0] : match[1][1] || match[1][0]) : undefined;
}

const visitors = {
  /*
    CallExpression:
      todo => [1, 2, 3, 4, 5].includes(todo.priority)
      todo => approvers.includes(todo.createdBy)
      todo => todo.approvers.includes(todo.createdBy)
  */
  CallExpression(env, negate) {
    const { path, key, parents, parentKeys } = env;
  },

  /*
    todo => todo.x == 1 && todo.y === 2
  */
  LogicalExpression(env, negate) {
    const { path, key, parents, parentKeys } = env;
    const node = path.node;
    const left = path.get("left");
    const right = path.get("right");

    const operator = node.operator === "&&"
      ? negate ? "$or" : "$and"
      : node.operator === "||"
        ? negate ? "$and" : "$or"
        : new Skip(`Unsupported operator ${node.operator} in LogicalExpression.`, env);

    return isMatchOrValue(operator)
      ? (() => {
          const leftVal = visitors[left.type]({ ...env, path: left }, negate);
          return isMatchOrValue(leftVal)
            ? (() => {
                const rightVal = visitors[right.type]({ ...env, path: right }, negate);
                return isMatchOrValue(rightVal)
                  ? {
                      operator,
                      left: leftVal,
                      right: rightVal
                    }
                  : rightVal;
              })()
            : leftVal;
        })()
      : operator;
  },

  /*
    todo => todo.x === 10
  */
  BinaryExpression(env, negate) {
    const { path, key, parents, parentKeys } = env;
    const node = path.node;
    const left = path.get("left");
    const right = path.get("right");

    //See if left or right references the collection variable.
    const parts = [[left, right, !!negate], [right, left, !negate]];
    const fieldOpAndVal = (function loop(_parts) {
      const [first, second, flipOperator] = _parts[0];

      //We're going to disallow operations which compare two fields on the same object/row
      //  NOT ALLOWED: todo => todo.likeCount > todo.dislikeCount
      return arrowFunctions.isMemberExpressionDefinedOnParameter(first)
        ? !arrowFunctions.isMemberExpressionDefinedOnParameter(second)
          ? {
              operator: getOperator(path.get("operator"), flipOperator),
              field: first.node.property.name,
              valueNode: second.node
            }
          : new Skip(`Comparing two fields in the same object is not supported.`, env)
        : _parts.length > 1
          ? loop(_parts.slice(1))
          : new Skip(
              `Neither of the fields in the predicate expression referenced the database collection.`,
              env
            );
    })(parts);

    return fieldOpAndVal;
  },

  /*
    todo => todo.incomplete
  */
  MemberExpression(env, negate) {
    const { path, key, parents, parentKeys } = env;
    return {
      operator: "$eq",
      field: path.node.property.name,
      valueNode: { type: "BooleanLiteral", value: !negate }
    };
  },

  /*
    todo => !todo.incomplete
  */
  UnaryExpression(env, negate) {
    const { path, key, parents, parentKeys } = env;
    return path.operator === "!"
      ? Object.keys(visitors).includes(path.type)
        ? visitors[path.type]({ ...env, path: path.get("argument") }, !negate)
        : new Skip(`Unsupported type ${path.type} in UnaryExpression.`, env)
      : new Skip(`Only '!' is supported as the operator in a UnaryExpression.`, env);
  }
};

export default function(state, analysisState, negate) {
  return (path, key, parents, parentKeys) => context =>
    visitors[path.type]({ path, key, parents, parentKeys }, negate);
}
