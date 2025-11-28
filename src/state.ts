import { createInterface, type Interface } from "readline";
import { getCommands } from "./command.js";
import { PokeAPI } from "./pokeapi.js";

export type CLICommand = {
  name: string;
  description: string;
  callback: (state: State, ...args: string[]) => Promise<void>;
};

export type State = {
  rl: Interface;
  cmds: Record<string, CLICommand>;
  pokeapi: PokeAPI;
  nextLocationsURL: string;
  prevLocationsURL: string;
};

export function initState(cacheInterval: number): State {
  return {
    rl: createInterface({
      input: process.stdin,
      output: process.stdout,
      prompt: "> ",
    }),
    cmds: getCommands(),
    pokeapi: new PokeAPI(cacheInterval),
    nextLocationsURL: "",
    prevLocationsURL: "",
  };
}
