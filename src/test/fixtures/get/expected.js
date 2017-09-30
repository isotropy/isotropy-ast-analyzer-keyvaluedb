module.exports = {
  type: "query",
  operation: "get",
  keyNode: {
    type: "StringLiteral",
    value: "Get_Eggs"
  },
  source: {
    type: "query",
    module: "todosDbModule",
    identifier: "myDb",
    collection: "todos"
  }
};
