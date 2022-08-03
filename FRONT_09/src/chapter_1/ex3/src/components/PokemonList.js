import { memo } from "react";
import "./PokemonList.css"
import {useDispatch, useSelector} from "react-redux";
import {delPokemon} from "../reducers/pokemonsSlice";

function PokemonList() {
    const pokemonsState = useSelector((state) => state.pokemons.pokemons);
    const isLight = useSelector((state) => !(state.theme.isLight));
    const dispatch = useDispatch();

    const pokemons = pokemonsState.map((pokemon) =>
        <div className={isLight ? "card" : "card card--light"} key={pokemon.id}>
            <img className={isLight ? "card__image" : "card__image card__image--light"} src={pokemon.sprites.front_default} alt=""/>
            <p>{pokemon.name}<br />Number of forms: {pokemon.forms.length}<br />Forms: {getForms(pokemon.forms)}</p>
            <div className={isLight ? "card__remove" : "card__remove card__remove--light"} onClick={() => removePokemon(pokemon.id)}>X</div>
        </div>
    );

    function getForms(pokemon) {
        if (pokemon) {
            return pokemon.reduce((total, item) => {
                return total + item.name + ' ';
            }, "")
        }
    }

    function removePokemon(id) {
        dispatch(delPokemon({
            pokemons: pokemonsState,
            id: id
        }));

        localStorage.setItem("pokemons", JSON.stringify(pokemonsState.filter(item => item.id !== id)));
    }

    return (
        <>
            {pokemons.length ? <div className={isLight ? "cards" : "cards cards--light"}>{pokemons}</div> : null}
        </>
    );
}

export default memo(PokemonList);