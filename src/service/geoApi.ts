import axios from "axios";

// Sincroniza
axios.post('http://localhost:8000/api/geo/sync')
    .then(res => console.log(res.data))
    .catch(err => console.error(err));

// Busca
axios.get('http://localhost:8000/api/geo')
    .then(res => console.log(res.data))
    .catch(err => console.error(err));