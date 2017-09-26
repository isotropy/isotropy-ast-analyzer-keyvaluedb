import myDb from "../my-db";

async function getAllTodos(who) {
  return myDb.todos;
}
