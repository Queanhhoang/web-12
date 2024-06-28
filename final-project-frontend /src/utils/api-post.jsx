import axios from 'axios';
import { getToken } from './helper'; // Adjust the path according to your project structure

const URL_SERVER = process.env.NEXT_PUBLIC_BACKEND_URL;

export const postAPI = async (endpoint, method = "GET", data = null) => {
    const token = getToken();
    const config = {
        method: method,
        url: `${URL_SERVER}${endpoint}`,
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        },
        data: data
    };

    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        console.error("API post error: ", error);
        throw error;
    }
};
