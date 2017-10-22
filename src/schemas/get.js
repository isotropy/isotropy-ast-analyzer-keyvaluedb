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
import { source, arrowFunctions, composite } from "isotropy-analyzer-utils";

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
    },
    {
      build: () => () => result =>
        result instanceof Match
          ? {
              ...result.value.object,
              operation: "get",
              key: result.value.arguments[0].body
            }
          : result
    }
  );
}
