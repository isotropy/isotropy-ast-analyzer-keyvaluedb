import myDb from "../my-db";

async function addTodo(title, assignee) {
  myDb.todos = myDb.todos.concat({ title, assignee });
}
