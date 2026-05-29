import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    usuario: null,
    isAuthenticated: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,

    reducers: {
        setUsuario: (state, action) => {
            state.usuario = action.payload
            state.isAuthenticated = true
        },

        logout: (state) => {
            state.usuario = null
            state.isAuthenticated = false
        }
    }
})

export const { setUsuario, logout } = authSlice.actions

export const authReducer = authSlice.reducer