import { BrowserRouter, Routes, Route } from "react-router-dom";

import DefaultLayout from "./layout/DefaultLayout.js";
import Homepage from "./pages/Homepage/Homepage.js";

import ContinentsView from "./pages/Databases/ContinentsView.js";
import CountriesView from "./pages/Databases/CountriesView.js";
import CitiesView from "./pages/Databases/CitiesView.js";

const RoutesApp = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route element={ < DefaultLayout /> }> 
                    <Route path="/" element={ <Homepage/> } />
                    <Route path="/views"> 
                        <Route path="/views/continent" element={ < ContinentsView /> } />
                        <Route path="/views/countries" element={ < CountriesView /> } />
                        <Route path="/views/cities" element={ <CitiesView/> } />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default RoutesApp