import myDb from "../my-db";

async function addTodo() {
  myDb.todos = myDb.todos.concat({ key: "Task", value: "Get Eggs" });
}
