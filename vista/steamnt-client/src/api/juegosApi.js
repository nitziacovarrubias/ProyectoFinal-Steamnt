import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getGamesByDeveloper = async (developerId) => {
    const response = await axios.get(`${API_URL}/games/developer/${developerId}`);
    return response.data;
};

