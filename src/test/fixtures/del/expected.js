module.exports = {
  type: "modification",
  operation: "del",
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
