import { memo } from "react";
import "./PokemonList.css"

function PokemonList(props) {
    const pokemons = props.pokemons.map((pokemon) =>
        <div className={"card"} key={pokemon.id}>
            <img className={"card__image"} src={pokemon.sprites.front_default} alt=""/>
            <p>{pokemon.name}<br />Number of forms: {pokemon.forms.length}<br />Forms: {getForms(pokemon.forms)}</p>
            <div className={"card__remove"} onClick={() => removePokemon(pokemon.id)}>X</div>
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
            {pokemons.length ? <div className={"cards"}>{pokemons}</div> : null}
        </>
    );
}

export default memo(PokemonList);