import { createInterface } from "node:readline/promises";
import { getCommands } from "./command.js";

export function cleanInput(input: string): string[] {
  const lower = input.toLowerCase();
  const trimmed = lower.trim();
  const result = trimmed.split(/\s+/);
  if (result.length == 1 && result[0] == "") {
    return [];
  }
  return result;
}

export function startREPL() {
  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "> ",
  });
  const cmds = getCommands();
  rl.prompt();
  rl.on("line", (input) => {
    const clean = cleanInput(input);
    if (clean.length == 0) {
      rl.prompt();
      return;
    }
    if (clean[0] in cmds) {
      cmds[clean[0]].callback(cmds);
    } else {
      console.log("Unknown command");
    }
    rl.prompt();
  });
}
