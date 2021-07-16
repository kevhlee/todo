const { Command } = require("commander");
const chalk = require("chalk");
const figlet = require("figlet");
const todoStore = require("./todo");
const { version } = require("../package.json");

//=====================================================================
// Helper
//=====================================================================

function printAllTodos() {
  const completedTodos = todoStore.getTodos((todo) => todo.done);
  const incompleteTodos = todoStore.getTodos((todo) => !todo.done);

  if (completedTodos.length === 0 && incompleteTodos === 0) {
    console.log("There are no to-do tasks");
  } else {
    if (incompleteTodos.length !== 0) {
      console.log(chalk.bold("Incomplete To-Do's 🛠"));

      for (let todo of incompleteTodos) {
        console.log(todoAsString(todo));
      }
    }

    if (completedTodos.length !== 0) {
      console.log("\n" + chalk.bold("Completed To-Do's ✅"));

      for (let todo of completedTodos) {
        console.log(todoAsString(todo));
      }
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
    console.log(chalk.bold("Completed Tasks ✅"));
  } else {
    console.log(chalk.bold("Incomplete Tasks 🛠"));
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

const commandReset = new Command("reset")
  .command("reset")
  .description("reset ID of each to-do task")
  .action(() => {
    todoStore.resetTodoIDs();
  });

const commandSort = new Command("sort")
  .command("sort")
  .option("-d, --desc", "sort in descending order", false)
  .option("-r, --reset", "reset the ID of each to-do task", false)
  .description("sort all the to-do tasks")
  .action((options) => {
    todoStore.sortTodos(options.desc, options.reset);
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

function logo() {
  const r = Math.round(0x20 + Math.random() * (0x100 - 0x20));
  const g = Math.round(0x20 + Math.random() * (0x100 - 0x20));
  const b = Math.round(0x20 + Math.random() * (0x100 - 0x20));

  return chalk.rgb(r, g, b).bold(figlet.textSync("todo", { font: "Soft" }));
}

function run(argv) {
  const cli = new Command("todo")
    .version(version)
    .addHelpText("beforeAll", logo)
    .addCommand(commandAdd)
    .addCommand(commandClear)
    .addCommand(commandDo)
    .addCommand(commandEdit)
    .addCommand(commandList)
    .addCommand(commandRemove)
    .addCommand(commandReset)
    .addCommand(commandSort)
    .addCommand(commandUndo);

  return cli.parseAsync(argv);
}

module.exports = {
  run,
};
