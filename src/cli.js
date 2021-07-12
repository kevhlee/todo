const { Command } = require("commander");
const todo = require("./todo");

const commandAdd = new Command("add")
  .command("add <todos...>")
  .description("add new to-do tasks")
  .action((todos) => {
    todo.addTodos(todos);
  });

const commandClear = new Command("clear")
  .description("clear completed to-do tasks")
  .action(() => {
    console.log("Not implemented yet");
  });

const commandDo = new Command("do")
  .description("mark to-do tasks as complete")
  .action(() => {
    console.log("Not implemented yet");
  });

const commandEdit = new Command("edit")
  .description("edit a to-do task")
  .action(() => {
    console.log("Not implemented yet");
  });

const commandList = new Command("list")
  .description("print incomplete to-do tasks")
  .action(() => {
    console.log("Not implemented yet");
  });

const commandRemove = new Command("remove")
  .description("remove to-do tasks")
  .action(() => {
    console.log("Not implemented yet");
  });

const commandUndo = new Command("undo")
  .description("mark to-do tasks as incomplete")
  .action(() => {
    console.log("Not implemented yet");
  });

function run(argv) {
  const cli = new Command("todo")
    .addCommand(commandAdd)
    .addCommand(commandClear)
    .addCommand(commandDo)
    .addCommand(commandEdit)
    .addCommand(commandList)
    .addCommand(commandRemove)
    .addCommand(commandUndo);

  return cli.parseAsync(argv);
}

module.exports = {
  run,
};
