import path from "path";

export default function(analysisState) {
  return {
    analyzeImportDeclaration(babelPath, state) {
      const dbModules = Object.keys(state.opts.databaseModules).map(key => ({
        key,
        value: path.resolve(state.opts.databaseModules[key])
      }));

      const moduleName = babelPath.get("source").node.value;
      const resolvedName = path.resolve(
        path.dirname(state.file.opts.filename),
        moduleName
      );

      const dbModule = dbModules.find(p => p.value === resolvedName);
      if (dbModule) {
        const specifier = babelPath.get("specifiers.0").node.local.name;
        analysisState.importBindings = analysisState.importBindings.concat({
          module: dbModule.key,
          binding: babelPath.scope.bindings[specifier]
        });
        return true;
      }
    }
  };
}
