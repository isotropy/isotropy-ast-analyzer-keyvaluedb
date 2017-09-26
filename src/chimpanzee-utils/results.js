import { Fault, Skip } from "chimpanzee";

export function isMatchOrValue(val) {
  return !(val instanceof Fault || val instanceof Skip)
}
