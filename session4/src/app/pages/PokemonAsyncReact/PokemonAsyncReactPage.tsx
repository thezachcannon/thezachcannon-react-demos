import { getPokemonList } from "@/app/shared/services/pokemonService";
import PokemonAsyncReact from "./PokemonAsyncReact";

const PokemonAsyncReactPage: React.FC = async ({}) => {
    const pokemonPromise = getPokemonList(151, 0);
 return (
        <div className="relative min-h-screen bg-gradient-to-b from-red-600 via-red-400 to-white text-slate-900">
            <div className="relative z-10">
                <PokemonAsyncReact pokemonPromise={pokemonPromise} />
            </div>
        </div>
    );
};

export default PokemonAsyncReactPage;
