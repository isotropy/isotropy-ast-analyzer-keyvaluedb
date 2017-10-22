import { source } from "../chimpanzee-utils";
import { collection } from "./";
import { capture, Match, Skip } from "chimpanzee";
import composite from "../chimpanzee-utils/composite";
import R from "ramda";

const unaryExp = {
  type: "UnaryExpression",
  operator: "!",
  argument: {
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
  }
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
            name: "filter"
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
            body: unaryExp
          }
        ]
      }
    },
    {
      build: obj => context => result =>
        result instanceof Match
          ? (() => {
              const data = result.value.arguments[0];
              return R.equals(result.value.left, result.value.object)
                ? R.equals(data.params[0].dataAccessor1, data.dataAccessor2)
                  ? del(result.value.left, {
                      keyNode: result.value.arguments[0].key
                    })
                  : new Skip(`Incorrect access variable.`)
                : new Skip(
                    `The result of the concat() must be assigned to the same collection.`
                  );
            })()
          : result
    }
  );
}
