const { Command } = require("commander");
const todoStore = require("./todo");

//=====================================================================
// Helper
//=====================================================================

function todoAsString(todo) {
  return `[${todo.done ? "✔" : " "}] ${todo.id}. ${todo.todo}`;
}

//=====================================================================
// Commands
//=====================================================================

const commandAdd = new Command("add")
  .command("add <todos...>")
  .description("add new to-do tasks")
  .action((todos) => {
    todoStore.addTodos(todos);
  });

const commandClear = new Command("clear")
  .command("clear")
  .alias("clr")
  .description("clear completed to-do tasks")
  .action(() => {
    todoStore.filteredRemoveTodos((todo) => todo.done);
  });

const commandDo = new Command("do")
  .command("do <ids...>")
  .description("mark to-do tasks as complete")
  .action((ids) => {
    todoStore.markTodos(ids, true);
  });

const commandEdit = new Command("edit")
  .command("edit <id> <todo>")
  .description("edit a to-do task")
  .action((id, newTodo) => {
    todoStore.editTodo(id, newTodo);
  });

const commandList = new Command("list")
  .command("list")
  .alias("ls")
  .option("-a, --all", "print all to-do tasks")
  .option("-c, --complete", "print completed to-do tasks")
  .description("print to-do tasks")
  .action((options) => {
    if (options.all && options.complete) {
      console.log("Invalid options");
      return;
    }

    const todos = todoStore.getTodos(
      (todo) => options.all || (options.complete ? todo.done : !todo.done)
    );

    if (todos.length === 0) {
      if (options.complete) {
        console.log("There are no completed to-do tasks.");
      } else {
        console.log("There are no to-do tasks.");
      }
    }

    for (let todo of todos) {
      console.log(todoAsString(todo));
    }
  });

const commandRemove = new Command("remove")
  .command("remove <ids...>")
  .alias("rm")
  .description("remove to-do tasks")
  .action((ids) => {
    todoStore.removeTodos(ids);
  });

const commandUndo = new Command("undo")
  .command("undo <ids...>")
  .description("mark to-do tasks as incomplete")
  .action((ids) => {
    todoStore.markTodos(ids, false);
  });

//=====================================================================
// CLI
//=====================================================================

function run(argv) {
  const cli = new Command("todo")
    .addCommand(commandAdd)
    .addCommand(commandClear)
    .addCommand(commandDo)
    .addCommand(commandEdit)
    .addCommand(commandList, { isDefault: true })
    .addCommand(commandRemove)
    .addCommand(commandUndo);

  return cli.parseAsync(argv);
}

module.exports = {
  run,
};
