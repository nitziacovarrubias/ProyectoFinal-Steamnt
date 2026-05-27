import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const convertirseDesarrollador = async (data) => {
    const response = await axios.post(`${API_URL}/developers/become`, data);
    return response.data;
};