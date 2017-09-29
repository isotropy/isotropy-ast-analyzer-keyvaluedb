import { parse, array, capture, builtins as $ } from "chimpanzee";
import { source } from "../chimpanzee-utils";
import { collection, map, sort } from "./";
import { get } from "../db-statements";
import predicate from "./common/predicate";
import composite from "../chimpanzee-utils/composite";

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
      arguments: capture()
    },
    {
      build: () => () => result => {
        return get(result.value.object, { match: result.value.arguments[0] })
      }
    }
  );
}
