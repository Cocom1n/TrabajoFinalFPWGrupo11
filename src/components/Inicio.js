import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./Inicio.css"



function Inicio() {
    return(
        <div className="separador"> 
            <section className="contenedor">
                <h1>Grupo 11</h1>
                <h2>Fundamentos de Programacion Web</h2>
                <h2>Trabajo Final - 2023</h2>

                <section className="Botones">
                    <button>
                        <Link to="/aboutUs" className="ruta">About Us</Link>
                    </button>
                    <button>
                        <Link to="/comparadorPrecios" className="ruta">Comparator</Link>
                    </button>
                    <button>
                        <Link to="/listaNotas" className="ruta">Notes List</Link>
                    </button>
                    <button>
                        <Link to="/juegoAnimales" className="ruta">Game for Kids</Link>
                    </button>
                    <button>
                        <Link to="/dude" className="ruta">Dude game</Link>
                    </button>
                    <button>
                        <Link to="/nave" className="ruta">Game about Spaceships</Link>
                    </button>
                    
                </section>
            </section>
            <div className="imagen"></div>
        </div>
    )
}
export default Inicio;