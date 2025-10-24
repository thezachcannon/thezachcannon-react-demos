'use client';
import { useState, use, Suspense, Activity, ViewTransition, startTransition, useOptimistic } from "react";
import Pokemons from "./components/Pokemons";
import { PokemonListItem, PokemonListResponse } from "@/app/shared/services/pokemonService";
import PokemonDetails from "./components/PokemonDetails";

/**
 * Extract numeric ID from a PokeAPI resource URL.
 * Examples:
 *  - "https://pokeapi.co/api/v2/pokemon/1/" -> 1
 *  - "https://pokeapi.co/api/v2/pokemon/25/" -> 25
 * If the URL doesn't contain a trailing numeric segment, returns 0.
 */
const getIdFromUrl = (url: string): number => {
	if (!url) return 0;
	// Trim trailing slash(es)
	const trimmed = url.replace(/\/+$/, '');
	const parts = trimmed.split('/');
	const last = parts[parts.length - 1];
	const id = Number(last);
	return Number.isFinite(id) && id > 0 ? id : 0;
};

const PokemonAsyncReact = ({ pokemonPromise }: { pokemonPromise: Promise<PokemonListResponse> }) => {
    const [viewedPokemon, setViewedPokemon] = useState<number | null>(null);
    const [isOpen, setIsOpen] = useState(false);

    const pokemon = use(pokemonPromise)
    const [displayedPokemon, setDisplayedPokemon] = useState<PokemonListItem[]>(pokemon.results.map(p => ({
        ...p,
        id: getIdFromUrl(p.url)
    })));

    const reverse = (arr: PokemonListItem[]) => {
        const copy = arr.slice();
        copy.reverse();
        return copy;
    }

    const reverseOrder = () => {
        startTransition(() => {
            setDisplayedPokemon(prev => reverse(prev));
        })
    }
    const handlePokemonClick = (pokemon: PokemonListItem) => {
        startTransition(() => {
            pokemon.id !== viewedPokemon && setViewedPokemon(pokemon.id)
            setIsOpen(true)
        }
        )
    };

    const teamDetailsCloseAction = () => {
        startTransition(() => {
            setViewedPokemon(null)
            setIsOpen(false)
        })
    }

    const onHover = (pokemon: PokemonListItem) => {
        setViewedPokemon(pokemon.id);
    };

    return (
        <div>
            <div className="flex justify-end p-4">
                {!isOpen && <button
                    type="button"
                    onClick={reverseOrder}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-white text-slate text-sm font-medium rounded-md shadow"
                    aria-label="Reverse"
                >
                    Reverse Order
                </button>}
            </div>
            <ViewTransition>
                <Activity mode={!isOpen ? "visible" : "hidden"}>
                    <Pokemons pokemons={displayedPokemon} onPokemonClick={handlePokemonClick} onHover={onHover} />
                </Activity>
            </ViewTransition>
            <ViewTransition>
                <Activity mode={isOpen ? "visible" : "hidden"}>
                    <PokemonDetails pokemon={viewedPokemon} action={teamDetailsCloseAction} />
                </Activity>
            </ViewTransition>
        </div>
    );
}

export default PokemonAsyncReact;