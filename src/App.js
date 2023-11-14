import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import  Inicio  from "./components/Inicio";
import  AboutUs  from "./components/AboutUs";
import AppAnimales from "./components/JuegoAnimales/AppAnimales.js";
import ListaDeNotas from "./components/ListaNotas/AppListaNotas.js";
import "./App.css"
//import React from "react";

function App (){
    return(
        <Router>
            <nav className="Navbar">
                <h2 className="tittle">Tittle</h2>
                <section className="rutas">
                    <Link to="/" className="ruta">Home</Link>
                    <Link to="/aboutUs" className="ruta">AboutUs</Link>
                    <Link to="/juegoAnimales" className="ruta">Game for Kids</Link>
                    <Link to="/listaNotas" className="ruta">Things to do</Link>
                </section>
            </nav>

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