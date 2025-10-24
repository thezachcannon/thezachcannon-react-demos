'use client';
import React, { startTransition, Suspense, use, useRef } from "react";
import { PokemonDetail, getPokemon } from "@/app/shared/services/pokemonService";
import { capitalize } from "@/app/shared/utils/capitalize";

interface PokemonDetailsProps {
	pokemon: number | null;
	action: () => void;
}

interface PokemonDetailsContentProps {
	pokemonPromise: Promise<PokemonDetail> | null;
	action: () => void;
}

export const Skeleton: React.FC = () => (
	<div className="max-w-[500px] mx-auto py-10 p-8 rounded-xl shadow-lg bg-white text-center">
		<div className="w-24 h-24 rounded-full bg-gray-200 mx-auto mb-6" />
		<div className="h-7 w-3/5 bg-gray-200 mx-auto mb-3" />
		<div className="h-4 w-2/5 bg-gray-100 mx-auto mb-6" />
		<div className="h-3 w-4/5 bg-gray-50 mx-auto" />
	</div>
);

const PokemonDetailsContent = ({ pokemonPromise, action }: PokemonDetailsContentProps) => {
	if (!pokemonPromise) return <div>No Pokémon selected.</div>;
	const p = use(pokemonPromise) as PokemonDetail;

	if (!p) return <div>No Pokémon found.</div>;

	const sprite = p.sprites?.front_default || `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${p.id}.png`;

	return (
		<div className="relative max-w-[500px] mx-auto py-10 p-8 rounded-xl shadow-2xl bg-white text-center" onClick={() => startTransition(() => { action(); })}>
			<button
				type="button"
				onClick={(e) => { e.stopPropagation(); startTransition(() => action()); }}
				className="absolute left-4 top-4 inline-flex items-center gap-2 px-2.5 py-1.5 bg-gray-100 dark:bg-slate-700 text-sm text-gray-700 dark:text-gray-200 rounded-md shadow-sm hover:bg-gray-200 dark:hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-300 dark:focus:ring-indigo-500"
				aria-label="Back"
			>
				← Back
			</button>

			<img
				src={sprite}
				alt={p.name + " sprite"}
				className="w-24 h-24 rounded-full object-contain mb-6 mx-auto"
			/>
			<h2 className="text-2xl font-semibold mb-3">{capitalize(p.name)}</h2>
			<div className="text-gray-500 text-lg mb-2">#{p.id}</div>
			<div className="text-gray-500 text-sm mb-4">Height: {p.height} • Weight: {p.weight}</div>
			<div className="text-gray-400 text-sm">
				Abilities: {p.abilities?.map(a => a.ability.name).join(', ')}
			</div>
		</div>
	);
};

interface PokemonPromise {
	key: string | number | null;
	promise: Promise<PokemonDetail> | null;
}

const PokemonDetails = ({ pokemon, action }: PokemonDetailsProps) => {
	const pokemonPromiseRef = useRef<PokemonPromise>(null);
	if (pokemon == null) return <div>No Pokémon selected.</div>;
	if (pokemon !== pokemonPromiseRef?.current?.key) {
		pokemonPromiseRef.current = { key: pokemon, promise: getPokemon(pokemon) };
	}
	return (
		<Suspense fallback={<Skeleton />}>
			<PokemonDetailsContent action={action} pokemonPromise={pokemonPromiseRef.current.promise} />
		</Suspense>
	);
};

export default PokemonDetails;
