import { useEffect } from "react"
import api from "../../service/axios.js"

function Homepage() {

    useEffect(()=> {
        api.get('/continents')
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.error(err)
            })
    }, [])

    return( 
        <h1>oii</h1>
    )
}

export default Homepage