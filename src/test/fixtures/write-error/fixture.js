import myDb from "../my-db";

async function writeError() {
  myDb.todos = myDb.todos.pop();
}
