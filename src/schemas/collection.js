import { capture, wrap, Match, Skip } from "chimpanzee";
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
        return result instanceof Match
          ? (() => {
              const database = result.value.root.databases[result.value.collection];
              return database
                ? {
                    identifier: result.value.root.identifier,
                    database,
                  }
                : new Error(
                    `Could not find configuration for key value database ${result
                      .value.collection}.`
                  );
            })()
          : result;
      }
    }
  );
}
