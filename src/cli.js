const { Command } = require("commander");
const todo = require("./todo");

//=====================================================================
// Helper
//=====================================================================

function todoAsString(t) {
  return `[${t.done ? "✔" : " "}] ${t.id}. ${t.todo}`;
}

//=====================================================================
// Commands
//=====================================================================

const commandAdd = new Command("add")
  .command("add <todos...>")
  .description("add new to-do tasks")
  .action((todos) => {
    todo.addTodos(todos);
  });

const commandClear = new Command("clear")
  .command("clear")
  .alias("clr")
  .description("clear completed to-do tasks")
  .action(() => {
    todo.filteredRemoveTodos((todo) => todo.done);
  });

const commandDo = new Command("do")
  .command("do <ids...>")
  .description("mark to-do tasks as complete")
  .action((ids) => {
    todo.markTodos(ids, true);
  });

const commandEdit = new Command("edit")
  .description("edit a to-do task")
  .action(() => {
    console.log("Not implemented yet");
  });

const commandList = new Command("list")
  .command("list")
  .alias("ls")
  .option("-a, --all", "print all to-do tasks")
  .option("-c, --complete", "print completed to-do tasks")
  .description("print to-do tasks")
  .action((options) => {
    if (options.all && options.complete) {
      console.error("Invalid options");
      return;
    }

    const todos = todo.getTodos(
      (t) => options.all || (options.complete ? t.done : !t.done)
    );

    for (let t of todos) {
      console.log(todoAsString(t));
    }
  });

const commandRemove = new Command("remove")
  .command("remove <ids...>")
  .alias("rm")
  .description("remove to-do tasks")
  .action((ids) => {
    todo.removeTodos(ids);
  });

const commandUndo = new Command("undo")
  .command("undo <ids...>")
  .description("mark to-do tasks as incomplete")
  .action((ids) => {
    todo.markTodos(ids, false);
  });

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
