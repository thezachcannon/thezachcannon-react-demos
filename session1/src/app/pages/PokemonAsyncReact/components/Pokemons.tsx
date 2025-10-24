import PokemonCard from "./PokemonCard";

import { PokemonListItem } from "@/app/shared/services/pokemonService";

interface PokemonsProps {
	pokemons: PokemonListItem[];
	onPokemonClick?: (pokemon: PokemonListItem) => void;
	onHover?: (pokemon: PokemonListItem) => void;
}

const Pokemons: React.FC<PokemonsProps> = ({ pokemons, onPokemonClick, onHover }) => {
	const _onHover = (pokemon: PokemonListItem) => () => {
		if (onHover) onHover(pokemon);
	};

	const _onClick = (pokemon: PokemonListItem) => () => {
		if (onPokemonClick) onPokemonClick(pokemon);
	};

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto p-6 hover:cursor-pointer">
			{pokemons.map((pokemon) => <div key={pokemon.name} onMouseEnter={_onHover(pokemon)} onClick={_onClick(pokemon)}>
				<PokemonCard pokemon={pokemon} />
			</div>
			)}
		</div>
	);
};

export default Pokemons;