import {
  Skip,
  Match,
  Empty,
  Fault,
  capture,
  wrap,
  parse,
  any,
  builtins as $
} from "chimpanzee";

import { collection } from "./";

import { source, composite, permuteProps } from "isotropy-analyzer-utils";

import { canParse } from "isotropy-analyzer-errors";

export default function(state, analysisState) {
  return composite({
    type: "CallExpression",
    callee: {
      type: "MemberExpression",
      object: source([collection])(state, analysisState),
      property: {
        type: "Identifier",
        name: "find"
      }
    }
  }).then(({ object: _object }) =>
    composite(
      {
        arguments: [
          wrap({
            type: "ArrowFunctionExpression",
            params: capture()
          }).then(({ params }) => ({
            body: any(
              permuteProps(["left", "right"], {
                type: "BinaryExpression",
                left: {
                  type: "MemberExpression",
                  object: { type: "Identifier", name: params[0].name }
                },
                operator: "===",
                right: capture("key")
              })
            )
          }))
        ]
      },
      {
        build: obj => () => result =>
          result instanceof Match
            ? {
                ..._object,
                operation: "get",
                key: result.value.arguments[0].body.key
              }
            : new Fault(
                `Invalid database expression. Should look like: myDb.todos.find(todo => todo.key === "some_key")`
              )
      }
    )
  );
}
