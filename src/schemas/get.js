import { parse, array, capture, builtins as $ } from "chimpanzee";
import { source } from "../chimpanzee-utils";
import { collection, map, sort } from "./";
import { filter } from "../db-statements";
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
          name: "filter"
        }
      },
      arguments: [
        {
          type: "ArrowFunctionExpression",
          params: $.arr([capture()], { selector: "path" }),
          body: $.func(predicate(state, analysisState), { selector: "path" })
        }
      ]
    },
    {
      build: () => () => result =>
        filter(result.value.object, { predicate: result.value.arguments[0] })
    }
  );
}
