import { capture, wrap, Match } from "chimpanzee";
import { createCollection } from "../db-statements";
import { root } from "./";
import composite from "../chimpanzee-utils/composite";

export default function(state, analysisState) {
  return composite(
    {
      type: "MemberExpression",
      object: wrap(root(state, analysisState), {
        key: "root",
        selector: "path"
      }),
      property: {
        type: "Identifier",
        name: capture("collection")
      }
    },
    {
      build: obj => context => result => {
        const module = result.value.root.module.find(
          m => m.name === result.value.collection
        );
        return result instanceof Match
          ? module.connStr
            ? createCollection({
                identifier: result.value.root.identifier,
                module: module.connStr,
                collection: result.value.collection
              })
            : new Skip(
                `Incorrect configuration. Could not resolve DB Connection String.`
              )
          : result;
      }
    }
  );
}
