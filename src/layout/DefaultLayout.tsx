import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header.js"
import Sidebar from "../components/Sidebar/Sidebar.js"

import homepageCover from '../assets/covers/homepage-cover.png' 

function DefaultLayout(){
    return(
        <>
            <Header pageTitle={undefined} pageSubtitle={undefined}/>

            <section className="row container-md mx-auto mt-3 pb-3">
                <div className="col">
                    <Outlet />
                </div>
            </section>

        </>
    )
}

export default DefaultLayout