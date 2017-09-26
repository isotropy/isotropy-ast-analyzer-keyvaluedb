import { composite } from "chimpanzee";

export default function(schema, params) {
  return composite(
    schema,
    [
      { name: "default", modifiers: { object: path => path.node } },
      { name: "path", modifiers: { property: (path, key) => path.get(key) } }
    ],
    params
  )
}
