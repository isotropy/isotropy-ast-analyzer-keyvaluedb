import path from "path";

export default function(analysisState) {
  return {
    analyzeImportDeclaration(babelPath, state) {
      // Incorrect config
      if (!state.opts.projects) return false;

      const moduleName = babelPath.get("source").node.value;
      const resolvedName = path.resolve(
        path.dirname(state.file.opts.filename),
        moduleName
      );
      let absolutePath = null;

      const dbProject = state.opts.projects.find(project => {
        const projectDir = project.dir.startsWith("./")
          ? project.dir
          : "./" + project.dir;
        absolutePath = path.resolve(projectDir) + "/";
        return resolvedName.startsWith(absolutePath);
      });

      // Not a db project
      if (!dbProject) return false;
      dbProject.absolutePath = absolutePath;

      const dbModule = dbProject.modules.find(
        m => dbProject.absolutePath + m.source === resolvedName
      );

      if (!dbModule) return false;

      const specifier = babelPath.get("specifiers.0").node.local.name;
      analysisState.importBindings = analysisState.importBindings.concat({
        module: dbModule.locations,
        binding: babelPath.scope.bindings[specifier]
      });
      return true;
    }
  };
}
