import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header.js"

import homepageCover from '../assets/covers/homepage-cover.png' 

function DefaultLayout(){
    return(
        <>
            <Header pageTitle={undefined} pageSubtitle={undefined}/>

            <div className="container-md">
                <Outlet />
            </div>
        </>
    )
}

export default DefaultLayout