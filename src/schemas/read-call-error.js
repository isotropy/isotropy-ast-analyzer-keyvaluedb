import { collection } from "./";
import { capture, map as mapResult, wrap, Match } from "chimpanzee";
import composite from "../chimpanzee-utils/composite";
import clean from "../chimpanzee-utils/node-cleaner";
import exception from "../exception";

export default function(state, analysisState) {
  return composite(
    {
      type: "CallExpression",
      callee: {
        type: "MemberExpression",
        object: wrap(collection(state, analysisState), {
          key: "fs",
          selector: "path"
        })
      }
    },
    {
      build: () => () => result => {
        return result instanceof Match
          ? (() => {
              return result.value.fs
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
