import {
  Skip,
  Match,
  Empty,
  Fault,
  Error,
  capture,
  wrap,
  parse,
  builtins as $
} from "chimpanzee";
import { collection } from "./";
import { source, arrowFunctions, composite } from "isotropy-analyzer-utils";
import { canParse } from "isotropy-analyzer-errors";

const binaryExpression = composite(
  {
    type: "BinaryExpression",
    left: wrap(
      obj => () =>
        arrowFunctions.isMemberExpressionDefinedOnParameter(obj)
          ? new Match(obj)
          : new Fault(
              `Expression must be defined on the arrow function parameter.`
            ),
      { selector: "path" }
    ),
    operator: "===",
    right: capture("key")
  },
  {
    build: obj => () => result =>
      result instanceof Match ? result.value.key : result,
    selector: "path"
  }
);

export default function(state, analysisState) {
  const schema = {
    type: "CallExpression",
    callee: {
      type: "MemberExpression",
      object: source([collection])(state, analysisState),
      property: {
        type: "Identifier",
        name: "find"
      }
    },
    arguments: [
      {
        type: "ArrowFunctionExpression",
        body: binaryExpression
      }
    ]
  };

  return composite(schema, {
    build: obj => () => result =>
      result instanceof Match
        ? {
            ...result.value.object,
            operation: "get",
            key: result.value.arguments[0].body
          }
        : result instanceof Skip &&
          canParse(schema.callee.object, obj.get("callee.object")) &&
          obj.node.callee.property.name === "find"
          ? new Fault(
              `Invalid database expression. Should look like: myDb.todos.find(todo => todo.key === "some_key")`
            )
          : result
  });
}
