import { createSlice } from '@reduxjs/toolkit'
import { ListarJuegosUsuario, agregarJuegoALibrary } from '../actions/LibraryAction'

const initialState = {
    libraryGames: [],
    libraryGame: {},
    loading: false,
    error: null,
    successMessage: null,
    errorMessage: null
}

const librarySlice = createSlice({
    name: 'library',
    initialState,
    reducers: {
        clearLibraryMessages: (state) => {
            state.successMessage = null
            state.errorMessage = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(ListarJuegosUsuario.pending, (state) => {
                state.loading = true
                state.error = null
            })

            .addCase(ListarJuegosUsuario.fulfilled, (state, action) => {
                state.loading = false
                state.libraryGames = action.payload
            })

            .addCase(ListarJuegosUsuario.rejected, (state, action) => {
                state.loading = false
                state.error = typeof action.payload === 'string'
                    ? action.payload
                    : action.payload?.message ?? 'Error al listar juegos'
            })

            .addCase(agregarJuegoALibrary.pending, (state) => {
                state.loading = true
                state.successMessage = null
                state.errorMessage = null
            })

            .addCase(agregarJuegoALibrary.fulfilled, (state, action) => {
                state.loading = false
                state.successMessage = action.payload?.message ?? 'Juego agregado'
            })

            .addCase(agregarJuegoALibrary.rejected, (state, action) => {
                state.loading = false
                state.errorMessage = typeof action.payload === 'string'
                    ? action.payload
                    : action.payload?.message ?? 'No se pudo agregar el juego'
            })
    }
})

export const { clearLibraryMessages } = librarySlice.actions

export default librarySlice.reducer