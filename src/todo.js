const { existsSync, mkdirSync } = require("fs");
const { homedir } = require("os");
const { join } = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

class TodoStore {
  constructor() {
    const todosDir = join(homedir(), ".todos");
    const todosFile = join(todosDir, "todos.json");

    if (!existsSync(todosDir)) {
      mkdirSync(todosDir);
    }

    this.db = low(new FileSync(todosFile));
    this.db
      .defaults({
        todos: [],
        count: 1,
      })
      .write();
  }

  addTodos(todos) {
    let count = this.db.get("count").value();

    this.db
      .get("todos")
      .push(
        ...todos.map((todo) => {
          return {
            id: count++,
            todo: todo.match(/(\.|!|\?)$/) ? todo : todo + ".",
            done: false,
          };
        })
      )
      .write();

    this.db.set("count", count).write();
  }

  editTodo(id, todo) {
    todo = todo.match(/(\.|!|\?)$/) ? todo : todo + ".";

    this.db
      .get("todos")
      .find({ id: parseInt(id) })
      .assign({ todo })
      .write();
  }

  filteredRemoveTodos(filter) {
    this.db.get("todos").remove(filter).write();
  }

  getTodos(filter) {
    return this.db.get("todos").filter(filter).value();
  }

  markTodos(ids, done) {
    for (let id of ids) {
      this.db
        .get(`todos`)
        .find({ id: parseInt(id) })
        .assign({ done })
        .write();
    }
  }

  removeTodos(ids) {
    ids = ids.map((id) => parseInt(id));

    this.db
      .get("todos")
      .remove((todo) => ids.includes(todo.id))
      .write();
  }
}

module.exports = new TodoStore();
