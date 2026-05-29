import { createSlice } from '@reduxjs/toolkit'
import { listarGeneros } from '../actions/generosAction'

const initialState = {
    generos: [],
    genero: {},
    loading: false,
    error: null
}

const generosSlice = createSlice({
    name: 'generos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listarGeneros.pending, state => {
                state.loading = true
                state.error = null
            })
            .addCase(listarGeneros.fulfilled, (state, action) => {
                state.loading = false
                state.generos = action.payload
            })
            .addCase(listarGeneros.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
    }
})

export const generosReducer = generosSlice.reducer
