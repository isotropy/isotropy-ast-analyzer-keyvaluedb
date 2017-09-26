//todo.assignee === who && (todo.priority > 2 || todo.immediate) && todo.new
module.exports = {
  type: "query",
  method: "filter",
  predicate: {
    operator: "$and",
    left: {
      operator: "$and",
      left: {
        operator: "$eq",
        field: "assignee",
        valueNode: {
          type: "Identifier",
          name: "who"
        }
      },
      right: {
        operator: "$or",
        left: {
          operator: "$gt",
          field: "priority",
          valueNode: {
            type: "NumericLiteral",
            value: 2
          }
        },
        right: {
          operator: "$eq",
          field: "immediate",
          valueNode: { type: "BooleanLiteral", value: true }
        }
      }
    },
    right: {
      operator: "$eq",
      field: "new",
      valueNode: { type: "BooleanLiteral", value: true }
    }
  },
  source: {
    type: "query",
    module: "todosDbModule",
    identifier: "myDb",
    collection: "todos"
  }
};
