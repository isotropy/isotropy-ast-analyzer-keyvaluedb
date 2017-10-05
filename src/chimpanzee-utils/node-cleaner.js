export default function clean(obj) {
  if (typeof obj !== "object") {
    return obj;
  } else {
    if (Array.isArray(obj)) {
      return obj.map(o => clean(o));
    } else {
      const newObj = {};
      for (const key in obj) {
        if (
          ![
            "start",
            "end",
            "loc",
            "computed",
            "shorthand",
            "extra",
            "__clone",
            "path"
          ].includes(key)
        ) {
          newObj[key] = clean(obj[key]);
        }
      }
      return newObj;
    }
  }
}
