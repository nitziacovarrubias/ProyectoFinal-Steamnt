import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'

export const listarGeneros = createAsyncThunk(
    'generos/listar',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get('/Genres')
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data ?? 'Error al listar géneros')
        }
    }
)
