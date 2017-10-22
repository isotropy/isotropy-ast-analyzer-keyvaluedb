module.exports = {
  identifier: "myDb",
  database: { connection: "redis://127.0.0.1:6379" },
  operation: "get",
  key: {
    type: "StringLiteral",
    value: "First_Task"
  }
};
