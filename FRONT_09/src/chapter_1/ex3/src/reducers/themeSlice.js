import { createSlice } from '@reduxjs/toolkit'

export const themeSlice = createSlice({
    name: 'themeSlice',
    initialState: {
        isLight: JSON.parse(localStorage.getItem("isLight"))
    },
    reducers: {
        switchTheme: (state) => {
            state.isLight = !state.isLight;
        }
    }
})

export default themeSlice.reducer
export const { switchTheme } = themeSlice.actions
