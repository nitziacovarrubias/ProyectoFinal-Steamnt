import { configureStore } from '@reduxjs/toolkit'
import { juegosReducer } from './slices/juegosSlice'
import { generosReducer } from './slices/generosSlice'

export const store = configureStore({
    reducer: {
        juegos: juegosReducer,
        generos: generosReducer
    }
})
