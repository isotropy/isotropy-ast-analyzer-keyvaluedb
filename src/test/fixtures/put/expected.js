module.exports = {
  identifier: "myDb",
  database: { connection: "redis://127.0.0.1:6379" },
  operation: "put",
  items: [
    {
      type: "ObjectExpression",
      properties: [
        {
          type: "ObjectProperty",
          method: false,
          key: { type: "Identifier", name: "key" },
          value: { type: "StringLiteral", value: "Task" }
        },
        {
          type: "ObjectProperty",
          method: false,
          key: { type: "Identifier", name: "value" },
          value: { type: "StringLiteral", value: "Get Eggs" }
        }
      ]
    }
  ]
};
