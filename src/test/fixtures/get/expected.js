module.exports = {
  type: "query",
  operation: "get",
  match: "Get_Eggs",
  source: {
    type: "query",
    module: "todosDbModule",
    identifier: "myDb",
    collection: "todos"
  }
};
