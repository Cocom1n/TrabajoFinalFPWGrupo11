import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import  Inicio  from "./components/Inicio";
import  AboutUs  from "./components/AboutUs";
import AppAnimales from "./components/JuegoAnimales/AppAnimales.js";
import ListaDeNotas from "./components/ListaNotas/AppListaNotas.js";
//import React from "react";

function App (){
    return(
        <Router>

            {/* Aqui se agrega la navbar y se linkea con los cosos de abajo*/}

            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="aboutUs" element={<AboutUs/>}/>
                <Route path="juegoAnimales" element={<AppAnimales/>}/>
                <Route path="listaNotas" element={<ListaDeNotas/>}/>
                {/* <Route path="*" element={<ErrorPage/>}/>
                <Route path="comparador" element={<Comparador/>}/>
                <Route path="dude" element={<DudePhaser/>}/>
                <Route path="nave" element={<NavePhaser/>}/> */}
            </Routes>
        </Router>
        
    )
}

export default App;