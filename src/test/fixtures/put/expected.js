module.exports = {
  type: "modification",
  operation: "put",
  keyNode: {
    type: "StringLiteral",
    value: "Task"
  },
  valueNode: {
    type: "StringLiteral",
    value: "Get Eggs"
  },
  source: {
    type: "query",
    module: "redis://127.0.0.1:6379",
    identifier: "myDb",
    collection: "todos"
  }
};
