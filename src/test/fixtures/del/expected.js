module.exports = {
  type: "modification",
  operation: "del",
  keyNode: {
    type: "StringLiteral",
    value: "Get_Eggs"
  },
  source: {
    type: "query",
    module: "redis://127.0.0.1:6379",
    identifier: "myDb",
    collection: "todos"
  }
};
