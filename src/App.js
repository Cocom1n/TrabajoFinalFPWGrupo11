import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import  Inicio  from "./components/Inicio";
import  AboutUs  from "./components/AboutUs";
import AppAnimales from "./components/JuegoAnimales/AppAnimales.js";
import ListaDeNotas from "./components/ListaNotas/AppListaNotas.js";
import AppNave from "./components/Nave/AppNave.js";
import ComparadorPrecios from "./components/ComparadorPrecios/AppComparador.js"; 
import AppDude from "./components/Dude/AppDude.js";
import ErrorPage from "./components/Error.js";
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
                    {/* <Link to="/" className="rutaNav">Home</Link> */}
                    <Link to="/aboutUs" className="rutaNav">AboutUs</Link>
                    <Link to="/comparadorPrecios" className="rutaNav"> Comparator </Link>
                    <Link to="/listaNotas" className="rutaNav">Notes List</Link>
                    <Link to="/juegoAnimales" className="rutaNav">Game for Kids</Link>
                    <Link to="/dude" className="rutaNav">Dude Game</Link>
                    <Link to="/nave" className="rutaNav">Game about Spaceships</Link>
                </section>
            </nav>

            <Routes>
                <Route path="/" element={<Inicio/>}/>
                <Route path="aboutUs" element={<AboutUs/>}/>
                <Route path="juegoAnimales" element={<AppAnimales/>}/>
                <Route path="listaNotas" element={<ListaDeNotas/>}/>
                <Route path="nave" element={<AppNave/>}/>
                <Route path="comparadorPrecios" element={<ComparadorPrecios/>}/>
                <Route path="dude" element={<AppDude/>}/>
                <Route path="*" element={<ErrorPage/>}/>
            </Routes>
        </Router>
        
    )
}

export default App;