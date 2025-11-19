import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout.js";
import Homepage from "./pages/Homepage/Homepage.js";
import DatabaseView from "./pages/Databases/DatabaseView.tsx";

const RoutesApp = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={ < DefaultLayout /> }> 
                    <Route path="/" element={ <Homepage/> } />
                    <Route path="/views"> 
                        <Route path="/views/continent" element={ <DatabaseView/> } />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp