import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../../api'

const obtenerMensajeError = (error, mensajeDefault) => {
    const data = error.response?.data

    if (typeof data === 'string') {
        return data
    }

    if (data?.message) {
        return data.message
    }

    if (data?.title) {
        return data.title
    }

    if (data?.errors) {
        const errores = Object.values(data.errors).flat()
        return errores.join(', ')
    }

    return mensajeDefault
}

export const ListarJuegosUsuario = createAsyncThunk(
    'library/fetchGames',
    async (userId, { rejectWithValue }) => {
        try {
            const response = await api.get(`/Library/${userId}`)
            return response.data
        } catch (error) {
            return rejectWithValue(
                obtenerMensajeError(error, 'Error al listar juegos')
            )
        }
    }
)

export const agregarJuegoALibrary = createAsyncThunk(
    'library/addGame',
    async ({ userId, gameId }, { rejectWithValue }) => {
        try {
            const response = await api.post('/Library/add', {
                userId,
                gameId
            })

            return response.data
        } catch (error) {
            console.log('Respuesta del backend:', error.response?.data)

            return rejectWithValue(
                obtenerMensajeError(error, 'Error al agregar juego a la biblioteca')
            )
        }
    }
)