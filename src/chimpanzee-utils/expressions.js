import exception from "../exception";

export function getIdentifier(path) {
  return path.type === "CallExpression"
    ? getIdentifier(path.get("callee"))
    : path.type === "MemberExpression"
        ? getIdentifier(path.get("object"))
        : path.type === "UnaryExpression"
            ? getIdentifier(path.get("argument"))
            : path.type === "Identifier" ? path : undefined;
}
