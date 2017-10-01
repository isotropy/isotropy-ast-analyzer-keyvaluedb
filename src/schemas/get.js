import { Skip, Match, capture, builtins as $ } from "chimpanzee";
import { source } from "../chimpanzee-utils";
import { collection } from "./";
import { get } from "../db-statements";
import composite from "../chimpanzee-utils/composite";

const binaryExp = {
  type: "BinaryExpression",
  left: {
    type: "MemberExpression",
    object: {
      type: "Identifier",
      name: capture("dataAccessor2")
    },
    property: {
      type: "Identifier",
      name: "key"
    }
  },
  operator: "===",
  right: capture("key")
};

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
          params: [
            {
              type: "Identifier",
              name: capture("dataAccessor1")
            }
          ],
          body: binaryExp
        }
      ]
    },
    {
      build: () => () => result =>
        result instanceof Match
          ? (() => {
              const data = result.value.arguments[0];
              return data.params[0].dataAccessor1 === data.dataAccessor2
                ? get(result.value.object, { keyNode: data.key })
                : new Skip(`The data access variables do not match`);
            })()
          : new Skip(`Not get`)
    }
  );
}
