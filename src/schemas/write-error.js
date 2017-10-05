import { collection } from "./";
import { capture, map as mapResult, Match, wrap, Skip } from "chimpanzee";
import { source } from "../chimpanzee-utils";
import composite from "../chimpanzee-utils/composite";
import exception from "../exception";
import R from "ramda";

export default function(state, analysisState) {
  return composite(
    {
      type: "AssignmentExpression",
      operator: "=",
      left: wrap(collection(state, analysisState), {
        key: "left",
        selector: "path"
      }),
      right: {
        type: "CallExpression",
        callee: {
          type: "MemberExpression",
          object: wrap(collection(state, analysisState), {
            key: "right",
            selector: "path"
          })
        }
      }
    },
    {
      build: obj => context => result => {
        return result instanceof Match
          ? (() => {
              return R.equals(result.value.left, result.value.right)
                ? exception(
                    "\n\nCompilation failed. Not a valid isotropy operation.\n"
                  )
                : result;
            })()
          : result;
      }
    }
  );
}
