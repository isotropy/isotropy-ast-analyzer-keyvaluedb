module.exports = {
  identifier: "myDb",
  database: { connection: "redis://127.0.0.1:6379" },
  operation: "del",
  key: {
    type: "StringLiteral",
    value: "Task"
  }
};
