export function createCollection(args) {
  const { module, identifier, collection } = args;
  return { type: "query", module, identifier, collection };
}

export function createQuery(operation, props, source) {
  return { type: "query", operation, ...props, source };
}

export function createValue(operation, props, source) {
  return { type: "value", operation, ...props, source };
}

export function createModification(operation, props, source) {
  return { type: "modification", operation, ...props, source };
}

export function get(command, args) {
  const { keyNode } = args;
  return createQuery("get", { keyNode }, command);
}

export function count(command) {
  return createValue("count", {}, command);
}

export function put(command, args) {
  const { keyNode, valueNode } = args;
  return createModification("put", { keyNode, valueNode }, command);
}

export function update(command, args) {
  const { fields, predicate } = args;
  return createModification("update", { fields, predicate }, command);
}

export function del(command, args) {
  const { keyNode } = args;
  return createModification("del", { keyNode }, command);
}
