import {combineReducers, configureStore} from '@reduxjs/toolkit'
import pokemonsReducer from "./reducers/pokemonsSlice"
import themeReducer from "./reducers/themeSlice";

const rootReducer = combineReducers({
    pokemons: pokemonsReducer,
    theme: themeReducer
})

export default configureStore({
    reducer: rootReducer
})