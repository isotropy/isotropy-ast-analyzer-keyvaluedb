import myDb from "../my-db";

async function deleteTodos(assignee) {
  myDb.todos = myDb.todos.filter(todo => !(Object.keys(todo)[0] === "Get_Eggs"))
}
