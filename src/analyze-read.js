import * as schemas from "./schemas";
import makeAnalyzer from "./make-analyzer";

export default function(analysisState) {
  return {
    analyzeCallExpression(path, state) {
      return makeAnalyzer([schemas.get], path, state, analysisState);
    },
    analyzeMemberExpression(path, state) {
      return makeAnalyzer(
        [schemas.count, schemas.collection, schemas.readMemberError],
        path,
        state,
        analysisState
      );
    }
  };
}
