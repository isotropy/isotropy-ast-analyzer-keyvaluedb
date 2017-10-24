import * as schemas from "./schemas";
import makeAnalyzer from "./make-analyzer";
import { schemas as errorSchemas } from "isotropy-analyzer-errors";

export default function(analysisState) {
  return {
    analyzeAssignmentExpression(path, state) {
      return makeAnalyzer(
        [schemas.put, schemas.del, errorSchemas.writeErrorSchema(schemas.root)],
        path,
        state,
        analysisState
      );
    }
  };
}
