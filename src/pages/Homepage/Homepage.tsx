import { useEffect, useState } from "react"
import api from "../../service/axios.js"

function Homepage() {
    const [valor, setValor] = useState()
    
    useEffect(() => {
        api.get(`/quote/100/${encodeURIComponent("Belize dollar")}`)
            .then(res => setValor(res.data))
            .catch(console.error);
    }, []);

    return( 
        <p>
            {valor}
        </p>
    )
}

export default Homepage