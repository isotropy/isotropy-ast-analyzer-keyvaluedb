import * as schemas from "./schemas";
import makeAnalyzer from "./make-analyzer";

export default function(analysisState) {
  return {
    /*
    Ending with a method call
      eg:
        myDb.todos.filter()
        myDb.todos.filter().filter()
        myDb.todos.map().filter()
        myDb.todos.map().slice()
        myDb.todos.sort()
    */
    analyzeCallExpression(path, state) {
      return makeAnalyzer(
        [
          // schemas.map, schemas.slice, schemas.sort,
          schemas.get],
        path,
        state,
        analysisState
      );
    },
    /*
      Ending with a member expression
      eg:
      myDb.todos
      myDb.todos.filter().length
    */
    analyzeMemberExpression(path, state) {
      return makeAnalyzer([schemas.count, schemas.collection], path, state, analysisState);
    }
  };
}
