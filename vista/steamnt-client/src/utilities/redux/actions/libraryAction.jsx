import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'

export const ListarJuegosUsuario = createAsyncThunk(
    'library/fetchGames',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/library/${userId}`, {
            })

            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data ?? 'Error al listar juegos')
        }
    }
)
