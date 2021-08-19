import axios from "axios";

const api = axios.create({
    baseURL: process.env.API_BASE
})

export default api