import { collection } from "./";
import { capture, Match, Skip } from "chimpanzee";
import { source, composite } from "isotropy-analyzer-utils";

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
            name: "concat"
          }
        },
        arguments: capture()
      }
    },
    {
      build: obj => context => result =>
        result instanceof Match
          ? {
              ...result.value.object,
              operation: "put",
              items: result.value.arguments
            }
          : result
    }
  );
}
