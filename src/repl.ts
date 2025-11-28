import { State } from "./state.js";

export function cleanInput(input: string): string[] {
  const lower = input.toLowerCase();
  const trimmed = lower.trim();
  const result = trimmed.split(/\s+/);
  if (result.length == 1 && result[0] == "") {
    return [];
  }
  return result;
}

export async function startREPL(state: State) {
  state.rl.prompt();
  state.rl.on("line", async (input) => {
    const clean = cleanInput(input);
    if (clean.length == 0) {
      state.rl.prompt();
      return;
    }
    if (clean[0] in state.cmds) {
      try {
        await state.cmds[clean[0]].callback(state, ...clean.slice(1));
      } catch (err) {
        console.log(`${err}`);
      }
    } else {
      console.log("Unknown command");
    }
    state.rl.prompt();
  });
}
