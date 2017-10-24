import myDb from "../my-db";

async function getTodos(who) {
  return myDb.todos.find(x => x > 200);
}
