import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL

export const listarJuegosUsuarioApi = async (userId) => {
    const response = await axios.get(`${API_URL}/Library/${userId}`)
    return response.data
}

export const agregarJuegoBibliotecaApi = async (data) => {
    const response = await axios.post(`${API_URL}/Library/add`, data)
    return response.data
}