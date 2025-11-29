import { Cache } from "./pokecache.js";

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  private cache: Cache;

  constructor(cacheInterval: number) {
    this.cache = new Cache(cacheInterval);
  }

  async fetchLocations(pageURL?: string): Promise<ShallowLocations> {
    const url = pageURL || `${PokeAPI.baseURL}/location-area`;

    const cached = this.cache.get<ShallowLocations>(url);
    if (cached) {
      console.log(`Retrieved cached page: ${url}`);
      return cached;
    }
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const locations: ShallowLocations = await response.json();
      console.log(`Retrieved live page: ${url}`);
      this.cache.add(url, locations);
      return locations;
    } catch (err) {
      throw new Error(`Error fetching locations: ${(err as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const url = `${PokeAPI.baseURL}/location-area/${locationName}`;

    const cached = this.cache.get<Location>(url);
    if (cached) {
      console.log(`Retrieved cached page: ${url}`);
      return cached;
    }
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const location: Location = await response.json();
      console.log(`Retrieved live page: ${url}`);
      this.cache.add(url, location);
      return location;
    } catch (err) {
      throw new Error(`Error fetching location: ${(err as Error).message}`);
    }
  }

  async fetchPokemon(pokemonName: string): Promise<Pokemon> {
    const url = `${PokeAPI.baseURL}/pokemon/${pokemonName}`;

    const cached = this.cache.get<Pokemon>(url);
    if (cached) {
      console.log(`Retrieved cached page: ${url}`);
      return cached;
    }
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const pokemon: Pokemon = await response.json();
      console.log(`Retrieved live page: ${url}`);
      this.cache.add(url, pokemon);
      return pokemon;
    } catch (err) {
      throw new Error(`Error fetching pokemon: ${(err as Error).message}`);
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  name: string;
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
  }[];
};

export type Pokemon = {
  name: string;
  base_experience: number;
  height: number;
  weight: number;
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
  types: {
    type: {
      name: string;
    };
  }[];
};
