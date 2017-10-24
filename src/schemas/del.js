import {
  Skip,
  Match,
  Error,
  capture,
  wrap,
  parse,
  builtins as $
} from "chimpanzee";
import { collection } from "./";
import { arrowFunctions, composite, source } from "isotropy-analyzer-utils";

const binaryExpression = composite(
  {
    type: "BinaryExpression",
    left: wrap(
      obj => () =>
        arrowFunctions.isMemberExpressionDefinedOnParameter(obj)
          ? new Match(obj)
          : new Error(
              `Expression must be defined on the arrow function parameter.`
            ),
      { selector: "path" }
    ),
    operator: "===",
    right: capture("key")
  },
  {
    build: obj => () => result => result.value.key,
    selector: "path"
  }
);

export default function(state, analysisState) {
  return composite(
    {
      type: "AssignmentExpression",
      operator: "=",
      left: source([collection])(state, analysisState),
      right: {
        type: "CallExpression",
        callee: {
          type: "MemberExpression",
          object: source([collection])(state, analysisState),
          property: {
            type: "Identifier",
            name: "filter"
          }
        },
        arguments: [
          {
            type: "ArrowFunctionExpression",
            body: {
              type: "UnaryExpression",
              operator: "!",
              argument: binaryExpression
            }
          }
        ]
      }
    },
    {
      build: () => () => result =>
        result instanceof Match
          ? {
              ...result.value.object,
              operation: "del",
              key: result.value.arguments[0].argument
            }
          : canParse(
              schema.right.callee.object,
              obj.get("right.callee.object")
            ) && obj.node.right.callee.property.name === "filter"
            ? new Fault(
                `Invalid database expression. Should look like: myDb.todos = myDb.todos.filter(todo => !(todo.key === "Task"))`
              )
            : result
    }
  );
}
