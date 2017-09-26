import myDb from "../my-db";

async function getTodos(who) {
  return myDb.todos.filter(todo => todo.assignee === who && (todo.priority > 2 || todo.immediate) && todo.new);
}
