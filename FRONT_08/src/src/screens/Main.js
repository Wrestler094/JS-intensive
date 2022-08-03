import React, { useState } from 'react';
import axios from 'axios';
import PokemonList from "../components/PokemonList";

function Main() {
    const [searchName, setSearchName] = useState("");
    const [pokemons, setPokemons] = useState([]);

    function handleChange(evt) {
        setSearchName(evt.target.value);
    }

    function searchPokemon(evt) {
        evt.preventDefault();
        axios.get(`https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`)
            .then(res => {
                let pokemon = res.data;
                setPokemons(prevState => {
                    return [pokemon, ...(prevState.filter(item => item.id !== res.data.id))]
                });
                setSearchName("");
            })
            .catch(err => alert("Такой покемон не найден"));
    }

    return (
        <>
            <form action="" onSubmit={searchPokemon}>
                <input
                    type="text"
                    name={"search"}
                    className={"search__input"}
                    value={searchName}
                    onChange={handleChange}
                    placeholder={"Input pokemon name"}
                />
            </form>
            <PokemonList pokemons={pokemons} remove={setPokemons} />
        </>
    );
}

export default Main;
