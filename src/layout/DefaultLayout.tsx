import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header.js"

function DefaultLayout(){
    return(
        <div className="container-md">
            <Header />
            <Outlet />

        </div>
    )
}

export default DefaultLayout