import { createSlice } from '@reduxjs/toolkit'
import { listarJuegos, juegoPorId } from '../actions/juegosAction'

const initialState = {
    juegos: [],
    juego: {},
    loading: false,
    error: null
}

const juegosSlice = createSlice({
    name: 'juegos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listarJuegos.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(listarJuegos.fulfilled, (state, action) => {
                state.loading = false
                state.juegos = action.payload
            })
            .addCase(listarJuegos.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(juegoPorId.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(juegoPorId.fulfilled, (state, action) => {
                state.loading = false
                state.juego = action.payload
            })
            .addCase(juegoPorId.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const juegosReducer = juegosSlice.reducer
