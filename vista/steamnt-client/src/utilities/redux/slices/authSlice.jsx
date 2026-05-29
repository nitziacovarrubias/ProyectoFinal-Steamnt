import { createSlice } from '@reduxjs/toolkit'

const storedUser = localStorage.getItem("user");
const storedUserId = localStorage.getItem("userId");

const initialState = {
    usuario: storedUser ? JSON.parse(storedUser) : null,
    usuarioId: storedUserId ? Number(storedUserId) : null,
    isAuthenticated: !!storedUser
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
            localStorage.removeItem("user");
            localStorage.removeItem("userId");
            localStorage.removeItem("userRole");

            state.usuario = null;
            state.isAuthenticated = false;
        }
    }
})

export const { setUsuario, logout } = authSlice.actions

export const authReducer = authSlice.reducer