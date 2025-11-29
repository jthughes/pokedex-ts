import { State } from "./state.js";

export async function commandCatch(state: State, ...args: string[]) {
  if (args.length != 1) {
    console.log("Command usage: catch <pokemon>");
    return;
  }

  const pokemon = await state.pokeapi.fetchPokemon(args[0]);
  console.log(`Throwing a Pokeball at ${pokemon.name}...`);
  if (Math.random() * 700 > pokemon.base_experience) {
    console.log(`${pokemon.name} was caught!`);
    state.pokedex[pokemon.name] = pokemon;
  } else {
    console.log(`${pokemon.name} escaped!`);
  }
}
