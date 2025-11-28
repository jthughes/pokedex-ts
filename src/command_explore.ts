import { State } from "./state.js";

export async function commandExplore(state: State, ...args: string[]) {
  if (args.length != 1) {
    console.log("Command usage: explore <area_name>");
    return;
  }

  const location_data = await state.pokeapi.fetchLocation(args[0]);
  for (const item of Object.values(location_data.pokemon_encounters)) {
    console.log(` - ${item.pokemon.name}`);
  }
}
