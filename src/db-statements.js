export function get(key) {
  return { operation: "get", key };
}

export function put(key, value) {
  return { operation: "put", key, value };
}

export function del(key) {
  return { operation: "del", key };
}
