import { collection } from "./";
import { capture, Match, Skip, Fault, parse } from "chimpanzee";
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
          name: "concat"
        }
      }
    }
  }).then(({ object: _object }) =>
    composite(
      {
        right: {
          arguments: [capture()]
        }
      },
      {
        build: obj => context => result =>
          result instanceof Match
            ? {
                ..._object,
                operation: "put",
                items: result.value.arguments
              }
            : new Fault(
                `Invalid database expression. Should look like: myDb.todos = myDb.todos.concat({ key: "Task", value: "Get Eggs" })`
              )
      }
    )
  );
}
