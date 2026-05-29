import { createSlice } from '@reduxjs/toolkit'
import { ListarJuegosUsuario } from '../actions/LibraryAction'

const initialState = {
    libraryGames: [],
    libraryGame: {},
    loading: false,
    error: null
}

const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(ListarJuegosUsuario.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(ListarJuegosUsuario.fulfilled, (state, action) => {
                state.loading = false
                state.libraryGames = action.payload
            })
            .addCase(ListarJuegosUsuario.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const libraryReducer = librarySlice.reducer
