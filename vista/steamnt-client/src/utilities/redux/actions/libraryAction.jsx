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

export const agregarJuegoALibrary = createAsyncThunk(
  'library/addGame',
  async ({ userId, gameId }, { rejectWithValue }) => {
    try {
      const response = await api.post('/library/add', {
        userId,
        gameId
      })

      return response.data
    } catch (error) {
      return rejectWithValue(
        error.response?.data ?? 'Error al agregar juego a la biblioteca'
      )
    }
  }
)
