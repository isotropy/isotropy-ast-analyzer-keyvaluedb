module.exports = {
  type: "query",
  operation: "get",
  match: {
    type: "ArrowFunctionExpression",
    id: {},
    generator: false,
    expression: true,
    async: false,
    params: [
      {
        type: "Identifier",
        name: "todo"
      }
    ],
    body: {
      type: "BinaryExpression",
      left: {
        type: "MemberExpression",
        object: {
          type: "CallExpression",
          callee: {
            type: "MemberExpression",
            object: {
              type: "Identifier",
              name: "Object"
            },
            property: {
              type: "Identifier",
              name: "keys"
            }
          },
          arguments: [
            {
              type: "Identifier",
              name: "todo"
            }
          ]
        },
        property: {
          type: "NumericLiteral",
          value: 0
        }
      },
      operator: "===",
      right: {
        type: "StringLiteral",
        value: "Get_Eggs"
      }
    }
  },
  source: {
    type: "query",
    module: "todosDbModule",
    identifier: "myDb",
    collection: "todos"
  }
};
