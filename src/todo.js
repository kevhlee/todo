const { existsSync, mkdirSync } = require("fs");
const { homedir } = require("os");
const { join } = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

class TodoManager {
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
}

module.exports = new TodoManager();
