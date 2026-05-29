import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'

export const listarJuegos = createAsyncThunk(
    'juegos/listar',
    async (filtros, { rejectWithValue }) => {
        try {
            const response = await api.get('/api/Games', {
                params: {
                    search: filtros?.busqueda || null,
                    genreId: filtros?.generoId || null
                }
            })

            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data ?? 'Error al listar juegos')
        }
    }
)

export const juegoPorId = createAsyncThunk(
    'juego/traer',
    async (id, { rejectWithValue }) => {
        try {
            const response = await api.get(`/Games/${id}`)
            return response.data
        } catch (error) {
            return rejectWithValue(error.response?.data ?? 'Error al listar juegos')
        }
    }
)
