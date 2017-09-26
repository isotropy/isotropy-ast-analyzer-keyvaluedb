import { builtins as $, capture, any, Match } from "chimpanzee";

function negativeInteger(key) {
  return $.obj(
    {
      type: "UnaryExpression",
      operator: "-",
      argument: {
        type: "NumericLiteral",
        value: capture("val")
      }
    },
    {
      build: obj => context => result =>
        result instanceof Match ? new Match({ [key]: -result.value.val }) : result
    }
  );
}

function positiveInteger(key) {
  return {
    type: "NumericLiteral",
    value: capture(key)
  };
}

export default function integer(key) {
  return any([negativeInteger(key), positiveInteger(key)], { replace: true });
}
