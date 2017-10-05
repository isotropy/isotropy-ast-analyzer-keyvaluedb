import myDb from "../my-db";

async function readError() {
  return myDb.todos.pop();
}
