export function print(obj, path, fn = x => x) {
  path = !path ? [] : typeof path === "string" ? path.split(".") : path;

  for (const frag of path) {
    if (typeof obj === "undefined") {
      console.log("undefined");
      return;
    }
    obj = obj[frag];
  }
  console.log(fn(obj));
}
