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
          name: "key"
        },
        value: {
          type: "StringLiteral",
          value: "Task"
        }
      },
      {
        type: "ObjectProperty",
        method: false,
        key: {
          type: "Identifier",
          name: "value"
        },
        value: {
          type: "StringLiteral",
          value: "Get Eggs"
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
};
