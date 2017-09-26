import myDb from "../my-db";

async function countTodos(who) {
  return myDb.todos.length;
}
