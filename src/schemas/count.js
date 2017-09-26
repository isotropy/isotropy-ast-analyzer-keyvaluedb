import { collection } from "./";
import { capture, any, Match } from "chimpanzee";
import { count } from "../db-statements";
import composite from "../chimpanzee-utils/composite";

export default function(state, analysisState) {
  return composite(
    {
      type: "MemberExpression",
      object: any([collection].map(fn => fn(state, analysisState)), { selector: "path" }),
      property: {
        type: "Identifier",
        name: "length"
      }
    },
    {
      build: obj => context => result =>
        result instanceof Match ? count(result.value.object) : result
    }
  );
}
