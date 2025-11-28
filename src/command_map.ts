import { State } from "./state.js";

export async function commandMap(state: State) {
  const locations = await state.pokeapi.fetchLocations(state.nextLocationsURL);
  for (const area of Object.values(locations.results)) {
    console.log(area.name);
  }
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
}

export async function commandMapb(state: State) {
  if (!state.prevLocationsURL) {
    throw new Error("already on first page");
  }
  const locations = await state.pokeapi.fetchLocations(state.prevLocationsURL);
  for (const area of Object.values(locations.results)) {
    console.log(area.name);
  }
  state.nextLocationsURL = locations.next;
  state.prevLocationsURL = locations.previous;
}
