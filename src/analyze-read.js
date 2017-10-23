import * as schemas from "./schemas";
import makeAnalyzer from "./make-analyzer";

export default function(analysisState) {
  return {
    analyzeCallExpression(path, state) {
      return makeAnalyzer([schemas.get], path, state, analysisState);
    }
  };
}
