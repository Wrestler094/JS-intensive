import { createSlice } from '@reduxjs/toolkit'

export const pokemonsSlice = createSlice({
    name: 'pokemonsSlice',
    initialState: {
        pokemons: []
    },
    reducers: {
        initPokemon: (state, action) => {
            state.pokemons = [...action.payload];
        },
        addPokemon: (state, action) => {
            state.pokemons.unshift(action.payload);
        },
        delPokemon: (state, action) => {
            state.pokemons = action.payload.pokemons.filter(item => item.id !== action.payload.id);
        },
    }
})

export default pokemonsSlice.reducer
export const { initPokemon, addPokemon, delPokemon } = pokemonsSlice.actions
