import myDb from "../my-db";

async function addTodo() {
  myDb.todos = myDb.todos.concat({ key: "First_Task", value: "Get Eggs" });
}
