import * as schemas from "./schemas";
import makeAnalyzer from "./make-analyzer";
import { schemas as errorSchemas } from "isotropy-analyzer-errors";

export default function(analysisState) {
  return {
    analyzeCallExpression(path, state) {
      return makeAnalyzer(
        [schemas.get, errorSchemas.readErrorSchema(schemas.root)],
        path,
        state,
        analysisState
      );
    }
  };
}
