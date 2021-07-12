const { Command } = require("commander");
const chalk = require("chalk");
const todoStore = require("./todo");

//=====================================================================
// Helper
//=====================================================================

function printAllTodos() {
  const completedTodos = todoStore.getTodos((todo) => todo.done);
  const incompleteTodos = todoStore.getTodos((todo) => !todo.done);

  if (completedTodos.length === 0 && incompleteTodos === 0) {
    console.log("There are no to-do tasks");
  } else {
    console.log(chalk.bold("Incomplete To-Do's"));

    for (let todo of incompleteTodos) {
      console.log(todoAsString(todo));
    }

    console.log("\n" + chalk.bold("Completed To-Do's"));

    for (let todo of completedTodos) {
      console.log(todoAsString(todo));
    }
  }
}

function printTodos(completed = false) {
  const todos = todoStore.getTodos((todo) => todo.done === completed);

  if (todos.length === 0) {
    if (completed) {
      console.log("There are no completed to-do tasks.");
    } else {
      console.log("There are no to-do tasks");
    }
    return;
  }

  if (completed) {
    console.log(chalk.bold("Completed Tasks"));
  } else {
    console.log(chalk.bold("Incomplete Tasks"));
  }

  for (let todo of todos) {
    console.log(todoAsString(todo));
  }
}

function todoAsString(todo) {
  const id = `  ${todo.id}`.slice(-2) + ".";
  const status = todo.done ? chalk.green.bold("✔") : " ";

  return `[${status}] ${id} ${todo.todo}`;
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

    if (options.all) {
      printAllTodos();
    } else {
      printTodos(options.complete);
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
