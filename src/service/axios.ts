import axios from "axios";

const PORT = 8000

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? `http://localhost:${PORT}/api`,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
})

export default api