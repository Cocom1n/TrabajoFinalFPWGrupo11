import React from 'react';
import Inicio from './InicioAnimales';
import Juego from './Juego';


function Felicitaciones({ nombreJugador, nombreJugador2, puntaje, puntaje2, setMostrarFelicitaciones, setMostrarJuego, setRondaActual, setSegundoTurno, segundoTurno, comodin, setComodin, comodin2, setComodin2}) 
{
    const volverAInicio = ()=>{
        //se cambian los estados a false para volver a jugar el juego y se reinicia el N° de rondas
        setRondaActual(1);
        setSegundoTurno(true);
        setMostrarFelicitaciones(false);
        setMostrarJuego(true);
        setComodin(false);
        setComodin2(false);
    }
    return (
        <div className='happy'>
            <h1 className='score'>Final score</h1>
            {<p> {nombreJugador} Your score is: {puntaje}</p>}
            {<p> {nombreJugador2} Your score is: {puntaje2}</p>}
            
            
            <h2 className='score'>The winner is</h2>
            <div className='ganador'> {puntaje == puntaje2 && <p>Tie! Have the same points</p>} </div>
            <div className='ganador'> {puntaje > puntaje2 && <p>{nombreJugador} win <br/>the game with {puntaje} points</p>} </div>
            <div className='ganador'> {puntaje2 > puntaje && <p>{nombreJugador2} win <br/>the game with {puntaje2} points</p>} </div>
            

            <button className='again' onClick={volverAInicio}>Start Again</button>


        </div>
    );
}

export default Felicitaciones;
