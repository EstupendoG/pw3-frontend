import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout.js";
import Homepage from "./pages/Homepage/Homepage.js";

const RoutesApp = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={ < DefaultLayout /> }> 
                    <Route path="/" element={ <Homepage/> } />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp