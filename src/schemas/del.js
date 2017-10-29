import {
  Skip,
  Match,
  Fault,
  capture,
  wrap,
  parse,
  any,
  permuteObject,
  builtins as $
} from "chimpanzee";
import { collection } from "./";
import { source, composite } from "isotropy-analyzer-utils";

export default function(state, analysisState) {
  return composite({
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
      }
    }
  }).then(({ object: _object }) =>
    composite(
      {
        right: {
          arguments: [
            wrap({
              type: "ArrowFunctionExpression",
              params: capture(),
              body: {
                type: "UnaryExpression",
                operator: "!"
              }
            }).then(({ params }) => ({
              body: {
                argument: any(
                  permuteObject(["left", "right"], {
                    type: "BinaryExpression",
                    left: {
                      type: "MemberExpression",
                      object: { type: "Identifier", name: params[0].name }
                    },
                    operator: "===",
                    right: capture("key")
                  })
                )
              }
            }))
          ]
        }
      },
      {
        build: obj => () => result =>
          result instanceof Match
            ? {
                ..._object,
                operation: "del",
                key: result.value.arguments[0].argument.key
              }
            : new Fault(
                `Invalid database expression. Should look like: myDb.todos = myDb.todos.filter(todo => !(todo.key === "Task"))`
              )
      }
    )
  );
}
