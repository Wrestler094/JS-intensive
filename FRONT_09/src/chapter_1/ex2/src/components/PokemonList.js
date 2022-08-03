import { memo, useContext } from "react";
import { UserContext } from "../screens/Main";
import "./PokemonList.css"

function PokemonList(props) {
    const isLight = useContext(UserContext);

    const pokemons = props.pokemons.map((pokemon) =>
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
        props.remove(prevState => prevState.filter(item => item.id !== id ))
    }

    return (
        <>
            {pokemons.length ? <div className={isLight ? "cards" : "cards cards--light"}>{pokemons}</div> : null}
        </>
    );
}

export default memo(PokemonList);