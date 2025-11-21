import axios from "axios";

const PORT = 8000

const api = axios.create({
    baseURL: `http://localhost:${PORT}/api`,
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    }
})

export default api