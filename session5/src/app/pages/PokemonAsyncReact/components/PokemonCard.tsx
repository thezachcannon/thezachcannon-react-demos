import { PokemonListItem } from "@/app/shared/services/pokemonService";
import { capitalize } from "@/app/shared/utils/capitalize";

interface PokemonCardProps {
	pokemon: PokemonListItem;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
	const spriteUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`;

	return (
		<div
			className={`bg-white border border-slate rounded-lg p-4 flex items-center gap-4`}
		>
			<img
				src={spriteUrl}
				alt={pokemon.name + " sprite"}
				className="w-16 h-16 object-contain"
				loading="lazy"
			/>
			<div>
				<div className="text-lg font-semibold text-slate-900">
					{capitalize(pokemon.name)}
				</div>
				<div className="text-sm text-slate-500">
					#{pokemon.id}
				</div>
			</div>
		</div>
	);
};

export default PokemonCard;
