import { collection } from "./";
import { capture, Match, Skip, Fault, parse } from "chimpanzee";
import { source, composite } from "isotropy-analyzer-utils";

function canParse(schema, obj) {
  const result = parse(schema)(obj)();
  return result instanceof Match || result instanceof Empty;
}

export default function(state, analysisState) {
  const schema = {
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
      },
      arguments: [capture()]
    }
  };
  return composite(schema, {
    build: obj => context => result => {
      return result instanceof Match
        ? {
            ...result.value.object,
            operation: "put",
            items: result.value.arguments
          }
        : canParse(schema.right.callee.object, obj.get("right.callee.object")) && obj.node.right.callee.property.name === "concat"
          ? new Fault(
              `Invalid database expression. Should look like: myDb.todos = myDb.todos.concat({ key: "Task", value: "Get Eggs" })`
            )
          : result
    }
  });
}
