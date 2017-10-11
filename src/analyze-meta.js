import path from "path";

export default function(analysisState) {
  return {
    analyzeImportDeclaration(babelPath, state) {
      // Incorrect config
      if (!state.opts.projects) return false;

      const dbProject = state.opts.projects.find(project => {
        const projectDir = project.dir.startsWith("./")
          ? project.dir
          : "./" + project.dir;
        const absolutePath = path.resolve(projectDir) + "/";
        return state.file.opts.filename.startsWith(absolutePath);
      });

      // Not a db project
      if (!dbProject) return false;

      const moduleName = babelPath.get("source").node.value;
      const resolvedName = path.resolve(
        path.dirname(state.file.opts.filename),
        moduleName
      );

      const dbModule = dbProject.modules.find(m => {
        const sourceDir = m.source.startsWith("./")
          ? m.source
          : "./" + m.source;
        const absolutePath = path.resolve(sourceDir);
        return absolutePath === resolvedName;
      });

      if (!dbModule) return false;

      const specifier = babelPath.get("specifiers.0").node.local.name;
      analysisState.importBindings = analysisState.importBindings.concat({
        module: dbModule.databases,
        binding: babelPath.scope.bindings[specifier]
      });
      return true;
    }
  };
}
