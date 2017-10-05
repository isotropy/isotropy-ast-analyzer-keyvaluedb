import { collection } from "./";
import { capture, any, Match } from "chimpanzee";
import composite from "../chimpanzee-utils/composite";

export default function(state, analysisState) {
  return composite(
    {
      type: "MemberExpression",
      object: any([collection].map(fn => fn(state, analysisState)), {
        key: "fs",
        selector: "path"
      })
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
