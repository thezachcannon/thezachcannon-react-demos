export interface PokemonListItem {
  name: string;
  url: string;
  id: number;
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
}

export interface PokemonAbility {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

export interface PokemonSpriteSet {
  front_default?: string | null;
  [key: string]: any;
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: PokemonAbility[];
  sprites: PokemonSpriteSet;
  [key: string]: any;
}

const API_BASE = 'https://pokeapi.co/api/v2';

async function handleJsonResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`PokeAPI error ${res.status}: ${text}`);
  }
  return res.json() as Promise<T>;
}

export async function getPokemonList(limit = 20, offset = 0): Promise<PokemonListResponse> {
  const url = `${API_BASE}/pokemon?limit=${limit}&offset=${offset}`;
  const res = await fetch(url);
  return handleJsonResponse<PokemonListResponse>(res);
}

export async function getPokemon(nameOrId: string | number): Promise<PokemonDetail> {
  const url = `${API_BASE}/pokemon/${encodeURIComponent(String(nameOrId))}`;
  const res = await fetch(url);
  return handleJsonResponse<PokemonDetail>(res);
}
