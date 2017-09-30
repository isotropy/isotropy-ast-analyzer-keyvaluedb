module.exports = {
  type: "modification",
  operation: "put",
  itemsNode: {
    type: "ObjectExpression",
    properties: [
      {
        type: "ObjectProperty",
        method: false,
        key: {
          type: "Identifier",
          name: "title"
        },
        value: {
          type: "Identifier",
          name: "title"
        }
      },
      {
        type: "ObjectProperty",
        method: false,
        key: {
          type: "Identifier",
          name: "assignee"
        },
        value: {
          type: "Identifier",
          name: "assignee"
        }
      }
    ]
  },
  source: {
    type: "query",
    module: "redis://127.0.0.1:6379",
    identifier: "myDb",
    collection: "todos"
  }
}
