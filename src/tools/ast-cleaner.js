export default function clean(obj) {
  if (typeof obj !== "object") {
    return obj;
  } else {
    const newObj = {};
    for (const key in obj) {
      if (
        !["start", "end", "loc", "computed", "shorthand", "extra"].includes(key)
      ) {
        newObj[key] = clean(obj[key]);
      }
    }
    return newObj;
  }
}
