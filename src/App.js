import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import  Inicio  from "./components/Inicio";
import  AboutUs  from "./components/AboutUs";
import AppAnimales from "./components/JuegoAnimales/AppAnimales.js";
import ListaDeNotas from "./components/ListaNotas/AppListaNotas.js";
import ComparadorPrecios from "./components/ComparadorPrecios/AppComparador.js"; 
import AppDude from "./components/Dude/AppDude.js";
import "./App.css"

function App (){
    return(
        <Router>
            <nav className="Navbar">
                <h2 className="logo">
                    <div className="imglogo"></div>
                <Link className="tittle" to="/">LOS GATOS</Link>
                </h2>
                <section className="rutas">

                    <Link to="/" className="ruta">Home</Link>
                    <Link to="/aboutUs" className="ruta">AboutUs</Link>
                    <Link to="/juegoAnimales" className="ruta">Game for Kids</Link>
                    <Link to="/listaNotas" className="ruta">Things to do</Link>
                    <Link to="/comparadorPrecios" className="ruta"> Comparator </Link>
                    <Link to="/dude" className="rutaNav">Dude Game</Link>

                </section>
            </nav>

            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="aboutUs" element={<AboutUs/>}/>
                <Route path="juegoAnimales" element={<AppAnimales/>}/>
                <Route path="listaNotas" element={<ListaDeNotas/>}/>
                <Route path="comparadorPrecios" element={<ComparadorPrecios/>}/>
                <Route path="dude" element={<AppDude/>}/>
                {/* <Route path="*" element={<ErrorPage/>}/>
                <Route path="nave" element={<NavePhaser/>}/> */}
            </Routes>
        </Router>
        
    )
}

export default App;