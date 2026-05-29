import { configureStore } from '@reduxjs/toolkit'
import { juegosReducer } from './slices/juegosSlice'
import { generosReducer } from './slices/generosSlice'
import libraryReducer from './slices/librarySlice'
import { authReducer } from './slices/authSlice'

export const store = configureStore({
    reducer: {
        juegos: juegosReducer,
        generos: generosReducer,
        library: libraryReducer,
        auth: authReducer
    }
})