# todo ✅

A CLI for managing to-do tasks.

## Description

For storage of the to-do tasks, the CLI creates a new directory and file: `$HOME/.todos/todos.json`. The CLI uses simple JSON to store the tasks.

## Setup

Installing the CLI requires NPM. To install, run the following commands:

```log
npm install
npm install --global
```

To uninstall, run the following commands:

```log
npm uninstall --global
rm -rf $HOME/.todos
```

## Usage

```log
  ,--.            ,--.
,-'  '-. ,---.  ,-|  | ,---.
'-.  .-'| .-. |' .-. || .-. |
  |  |  ' '-' '\ `-' |' '-' '
  `--'   `---'  `---'  `---'

Usage: todo [options] [command]

Options:
  -h, --help          display help for command

Commands:
  add <todos...>      add new to-do tasks
  clear|clr           clear completed to-do tasks
  do <ids...>         mark to-do tasks as complete
  edit <id> <todo>    edit a to-do task
  list|ls [options]   print to-do tasks
  remove|rm <ids...>  remove to-do tasks
  reset               reset ID of each to-do task
  undo <ids...>       mark to-do tasks as incomplete
  help [command]      display help for command
```
