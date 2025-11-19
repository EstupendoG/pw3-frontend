import { useEffect } from "react"
import api from "../../service/axios.js"
import Dropdown from "../../components/Dropdown/Dropdown.js"

function Homepage() {

    const items = [{
        id: 1,
        label: 'Continentes',
    }, {
        id: 2,
        label: 'Países',
    }, {
        id: 3,
        label: 'Cidades',
    }];

    // useEffect(()=> {
    //     api.get('/continents')
    //         .then(res => {
    //             console.log(res)
    //         })
    //         .catch(err => {
    //             console.error(err)
    //         })
    // }, [])

    return( 
        <Dropdown 
            dropdownItems={items}
            label="País"
        />
    )
}

export default Homepage