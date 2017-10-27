import myDb from "../my-db";

async function getTodos(who) {
  return myDb.todos.find(todo => "Task" === todo.key);
}
