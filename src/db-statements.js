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
  const { match } = args;
  return createQuery("get", { match }, command);
}

export function count(command) {
  return createValue("count", {}, command);
}

export function put(command, args) {
  const { itemsNode } = args;
  return createModification("put", { itemsNode }, command);
}

export function update(command, args) {
  const { fields, predicate } = args;
  return createModification("update", { fields, predicate }, command);
}

export function del(command, args) {
  const { key, operator, value } = args;
  return createModification("del", { key, value, operator }, command);
}
