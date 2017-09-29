module.exports = {
  type: "modification",
  operation: "del",
  key: {
    type: "Identifier",
    name: "task"
  },
  value: {
    type: "StringLiteral",
    value: "Get_Eggs"
  },
  operator: "===",
  source: {
    type: "query",
    module: "todosDbModule",
    identifier: "myDb",
    collection: "todos"
  }
};
