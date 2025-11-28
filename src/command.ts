import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { CLICommand } from "./state.js";

export function getCommands(): Record<string, CLICommand> {
  return {
    map: {
      name: "map",
      description: "Lists next 20 map areas",
      callback: commandMap,
    },
    mapb: {
      name: "mapb",
      description: "Lists previous 20 map areas",
      callback: commandMapb,
    },
    explore: {
      name: "explore",
      description: "Lists pokemon sepcified area",
      callback: commandExplore,
    },
    exit: {
      name: "exit",
      description: "Exits the Pokedex",
      callback: commandExit,
    },
    help: {
      name: "help",
      description: "Displays a help message",
      callback: commandHelp,
    },
  };
}
