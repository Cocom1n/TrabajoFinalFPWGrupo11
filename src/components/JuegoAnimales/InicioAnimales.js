import React, { useState } from 'react';
import Juego from './Juego';
import Felicitaciones from './Felicitaciones';

function InicioAnimales() {
const [nombreJugador, setNombreJugador] = useState(''); 
    const [nombreJugador2, setNombreJugador2] = useState('');
    const [mostrarJuego, setMostrarJuego] = useState(false);
    const [puntaje, setPuntaje] = useState(0);
    const [puntaje2, setPuntaje2] = useState(0);
    const [mostrarFelicitaciones, setMostrarFelicitaciones] = useState(false);
    const [rondaActual, setRondaActual] = useState(1);

    const [segundoTurno, setSegundoTurno] = useState(false);

    const manejarClickJugar = (nombre, nombre2) => {
        setNombreJugador(nombre);
        setNombreJugador2(nombre2);
        setMostrarJuego(true);
        setPuntaje(0);
        setPuntaje2(0);
        setMostrarFelicitaciones(false);
    };

    const alTerminar = (puntaje, puntaje2) => {
        setPuntaje(puntaje);
        setPuntaje2(puntaje2);
        setMostrarJuego(false);
        setMostrarFelicitaciones(true);
    };

    if (!mostrarJuego && !mostrarFelicitaciones) {
        return (
            <div className='container'>
                <h1 className='h1'>Enter the name of the Players</h1>
                <input className='texto'
                    type="text"
                    placeholder="child's name 1"
                    onChange={(e) => setNombreJugador(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Nchild's name 2"
                    onChange={(e) => setNombreJugador2(e.target.value)}
                />
                <button className='boton' onClick={() => manejarClickJugar(nombreJugador, nombreJugador2)}>Play</button>

            </div>
        );
    } else if (mostrarJuego) {
        return (
            <div>
                <Juego
                    nombreJugador={nombreJugador}
                    nombreJugador2={nombreJugador2}
                    puntaje={puntaje}
                    puntaje2={puntaje2}
                    setPuntaje={setPuntaje}
                    setPuntaje2={setPuntaje2}
                    alTerminar={alTerminar}
                    rondaActual={rondaActual}
                    setRondaActual={setRondaActual}
                    segundoTurno={segundoTurno}
                    setSegundoTurno={setSegundoTurno}
                />
            </div>
        );
    } else if (mostrarFelicitaciones) {
        return (
            <div>
                <Felicitaciones 
                    nombreJugador={nombreJugador}
                    nombreJugador2={nombreJugador2}
                    puntaje={puntaje} 
                    puntaje2={puntaje2}
                    //se envian los estados para reiniciar el juego
                    setMostrarFelicitaciones={setMostrarFelicitaciones}
                    setMostrarJuego={setMostrarJuego}
                    setRondaActual={setRondaActual}
                    setSegundoTurno={setSegundoTurno}
                    segundoTurno={segundoTurno}
                />
            </div>
        );
    }
}

export default InicioAnimales;
