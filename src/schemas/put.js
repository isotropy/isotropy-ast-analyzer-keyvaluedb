import { source } from "../chimpanzee-utils";
import clean from "../tools/ast-cleaner.js";
import { collection } from "./";
import { capture, Match, Skip } from "chimpanzee";
import composite from "../chimpanzee-utils/composite";
import R from "ramda";
import { put } from "../db-statements";

const arrayDetector = putObject => {
  let arrayDetected = false;

  const objectRecursor = checkingObject => {
    for (let prop of Object.values(checkingObject)) {
      if (prop === "ArrayExpression") {
        arrayDetected = true;
        break;
      }

      if (typeof prop === "object") objectRecursor(prop);
    }
  };

  objectRecursor(putObject);
  return arrayDetected;
};

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
          ? (() => {
              return R.equals(result.value.left, result.value.object)
                ? result.value.arguments[0].type === "ObjectExpression" &&
                    !arrayDetector(result.value.arguments[0])
                  ? put(result.value.left, {
                      itemsNode: result.value.arguments[0]
                    })
                  : new Skip(`You can only put objects inside an Isotropy-Redis store.`)
                : new Skip(
                    `The result of the concat() must be assigned to the same collection.`
                  );
            })()
          : result
    }
  );
}
