export function references(bindings, path) {
  const binding = bindings[path.node.name];
  return binding && binding.referencePaths.includes(path);
}
