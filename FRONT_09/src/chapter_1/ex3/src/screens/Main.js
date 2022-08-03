import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useDispatch, useSelector} from "react-redux";
import {addPokemon, initPokemon} from '../reducers/pokemonsSlice'
import {switchTheme} from '../reducers/themeSlice'
import PokemonList from "../components/PokemonList";
import './Main.css'

let isInit = false;

function Main() {
    const [searchName, setSearchName] = useState("");
    const isLight = useSelector((state) => !(state.theme.isLight));
    const pokemons = useSelector((state) => state.pokemons.pokemons);
    const dispatch = useDispatch();

    useEffect(() => {
        let pokemonsLocalStore = JSON.parse(localStorage.getItem("pokemons"));

        if (pokemonsLocalStore && pokemonsLocalStore.length) {
            dispatch(initPokemon(pokemonsLocalStore));
            isInit = true;
        }

        if (!isInit) {
            isInit = true;

            axios.get("https://pokeapi.co/api/v2/pokemon")
                .then(async res => {
                    let tmpArray = [];
                    for (let item of res.data.results) {
                        await axios.get(`https://pokeapi.co/api/v2/pokemon/${item.name}`)
                            .then(singleRes => {
                                tmpArray.push(singleRes.data)
                            })
                            .catch(err => console.log(err))
                    }

                    dispatch(initPokemon(tmpArray));
                    localStorage.setItem("pokemons", JSON.stringify(pokemons));
                })
                .catch(err => console.log(err))
        }
    }, []);

    function handleChange(evt) {
        setSearchName(evt.target.value);
    }

    function searchPokemon(evt) {
        evt.preventDefault();
        axios.get(`https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`)
            .then(res => {
                let pokemon = res.data;
                dispatch(addPokemon(pokemon))
                localStorage.setItem("pokemons", JSON.stringify([pokemon, ...pokemons]));
                setSearchName("");
            })
            .catch(err => alert("Такой покемон не найден"));
    }

    function themeHandler() {
        dispatch(switchTheme());
        localStorage.setItem("isLight", JSON.stringify(isLight));
    }

    return (
        <>
            <div className={"toggle__container"}>
                <label className="switch">
                    <input type="checkbox" checked={!isLight} />
                    <span className="slider round" onClick={themeHandler}></span>
                </label>
                <p className={isLight ? "toggle__name" : "toggle__name toggle__name--light"}>Dark theme</p>
            </div>
            <form action="" onSubmit={searchPokemon}>
                <input
                    type="text"
                    name={"search"}
                    className={isLight ? "search__input" : "search__input search__input--light"}
                    value={searchName}
                    onChange={handleChange}
                    placeholder={"Input pokemon name"}
                />
            </form>
            <PokemonList/>
        </>
    );
}

export default Main;
