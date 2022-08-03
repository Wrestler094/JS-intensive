import React, {useEffect, useState} from 'react';
import axios from 'axios';
import PokemonList from "../components/PokemonList";
import './Main.css'

export const UserContext = React.createContext();

let isInit = false;

function Main() {
    const [searchName, setSearchName] = useState("");
    const [pokemons, setPokemons] = useState(() => JSON.parse(localStorage.getItem("pokemons")) || []);
    const [isLight, setIsLight] = useState(true);

    useEffect(() => {
        if (pokemons.length) {
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

                    setPokemons(prevState => [...prevState, ...tmpArray]);
                })
                .catch(err => console.log(err))
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("pokemons", JSON.stringify(pokemons))
        console.log(pokemons)
    }, [pokemons])

    function handleChange(evt) {
        setSearchName(evt.target.value);
    }

    function searchPokemon(evt) {
        evt.preventDefault();
        axios.get(`https://pokeapi.co/api/v2/pokemon/${searchName.toLowerCase()}`)
            .then(res => {
                let pokemon = res.data;
                console.log(res.data);
                setPokemons(prevState => {
                    return [pokemon, ...(prevState.filter(item => item.id !== res.data.id))]
                });
                setSearchName("");
            })
            .catch(err => alert("Такой покемон не найден"));
    }

    function themeHandler() {
        if (isLight) {
            document.querySelector("body").style.backgroundColor = "#292929";
        } else {
            document.querySelector("body").style.backgroundColor = "white";
        }
        setIsLight(!isLight);
    }

    return (
        <>
            <div className={"toggle__container"}>
                <label className="switch">
                    <input type="checkbox" />
                    <span className="slider round" onClick={themeHandler}></span>
                </label>
                <p className={"toggle__name"}>Dark theme</p>
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
            <UserContext.Provider value={isLight}>
                <PokemonList pokemons={pokemons} remove={setPokemons} />
            </UserContext.Provider>
        </>
    );
}

export default Main;
