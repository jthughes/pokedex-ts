import { commandExit } from "./command_exit.js";
import { commandExplore } from "./command_explore.js";
import { commandCatch } from "./command_catch.js";
import { commandHelp } from "./command_help.js";
import { commandMap, commandMapb } from "./command_map.js";
import { CLICommand } from "./state.js";
import { commandInspect } from "./command_inspect.js";
import { commandPokedex } from "./command_pokedex.js";

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
    catch: {
      name: "catch",
      description: "Attempt to catch a pokemon",
      callback: commandCatch,
    },
    pokedex: {
      name: "pokedex",
      description: "List all pokemon in pokedex",
      callback: commandPokedex,
    },
    inspect: {
      name: "inspect",
      description: "Inspect pokemon in pokedex",
      callback: commandInspect,
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
