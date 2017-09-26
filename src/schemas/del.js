export default function() {
  return mutation({
    method: "filter",
    arguments: {
      "0": {
        type: "ArrowFunctionExpression",
        id: {},
        generator: false,
        expression: true,
        async: false,
        params: {
          "0": {
            type: "Identifier",
            name: "todo"
          }
        },
        body: {
          type: "UnaryExpression",
          operator: "!",
          prefix: true,
          argument: {
            type: "LogicalExpression",
            left: {
              type: "BinaryExpression",
              left: {
                type: "MemberExpression",
                object: {
                  type: "Identifier",
                  name: "todo"
                },
                property: {
                  type: "Identifier",
                  name: "assignee"
                }
              },
              operator: "===",
              right: {
                type: "Identifier",
                name: "assignee"
              }
            },
            operator: "&&",
            right: {
              type: "BinaryExpression",
              left: {
                type: "MemberExpression",
                object: {
                  type: "Identifier",
                  name: "todo"
                },
                property: {
                  type: "Identifier",
                  name: "title"
                }
              },
              operator: "===",
              right: {
                type: "Identifier",
                name: "title"
              }
            }
          }
        }
      }
    }
  });
}
