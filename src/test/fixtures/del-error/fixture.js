import myDb from "../my-db";

async function deleteTodos(assignee) {
  myDb.todos = myDb.todos.filter(todo => todo.key === "Task");
}
