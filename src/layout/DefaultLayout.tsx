import { Outlet } from "react-router-dom"
import Header from "../components/Header/Header.js"

import homepageCover from '../assets/covers/homepage-cover.png' 

function DefaultLayout(){
    return(
        <>
            <Header coverPosition="0 80%" coverUrl={homepageCover} pageBiIcon="postage-fill"/>

            <div className="container-md">
                <Outlet />

            </div>
        </>
    )
}

export default DefaultLayout