import * as schemas from "./schemas";
import makeAnalyzer from "./make-analyzer";

export default function(analysisState) {
  return {
    analyzeAssignmentExpression(path, state) {
      return makeAnalyzer(
        [schemas.put, schemas.del],
        path,
        state,
        analysisState
      );
    }
  };
}
