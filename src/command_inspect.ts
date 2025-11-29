import { State } from "./state.js";

export async function commandInspect(state: State, ...args: string[]) {
  if (args.length != 1) {
    console.log("Command usage: catch <pokemon>");
    return;
  }

  try {
    const pokemon = state.pokedex[args[0]];
    console.log(`Name: ${pokemon.name}`);
    console.log(`Height: ${pokemon.height}`);
    console.log(`Weight: ${pokemon.weight}`);
    console.log(`Stats:`);
    for (const stat of Object.values(pokemon.stats)) {
      console.log(`  -${stat.stat.name}: ${stat.base_stat}`);
    }
    console.log(`Types:`);
    for (const type of Object.values(pokemon.types)) {
      console.log(`  - ${type.type.name}`);
    }
  } catch (err) {
    // Note that while this avoids an api call, we are not validating that the input is a real pokemon
    console.log("you have not caught that pokemon");
  }
}
