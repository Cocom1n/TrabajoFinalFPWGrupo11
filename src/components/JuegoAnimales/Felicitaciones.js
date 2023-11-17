import React from 'react';
import Inicio from './InicioAnimales';
import Juego from './Juego';


function Felicitaciones({ nombreJugador, nombreJugador2, puntaje, puntaje2, setMostrarFelicitaciones, setMostrarJuego, setRondaActual, setSegundoTurno, segundoTurno}) 
{
    const volverAInicio = ()=>{
        //se cambian los estados a false para volver a jugar el juego y se reinicia el N° de rondas
        setRondaActual(1);
        setSegundoTurno(true);
        setMostrarFelicitaciones(false);
        setMostrarJuego(true);
    }
    const MostrarGanador = ()=>{
        // if(segundoTurno == true)
        // {
        //     if (puntaje == puntaje2) {
        //         <p> Empate, Ambos puntajes son iguales</p>
        //     }
        //     else if(puntaje > puntaje2){
        //         <p> {nombreJugador} ha ganado la partida con {puntaje} puntos</p>
        //     }
        //     else if(puntaje2 > puntaje){
        //         <p> {nombreJugador2} ha ganado la partida con {puntaje2} puntos</p>
        //     }
        // }
        // else{
        //     <p>No se ingreso otro puntaje</p>
        // }
    }
    return (
        <div className='happy'>
            <p className='score'>Total Score: 
                {<p> {nombreJugador} Your score is: {puntaje}</p>}
                {<p> {nombreJugador2} Your score is: {puntaje2}</p>}
            </p>
            
            <p className='score'>
                The winner is: 
                <p> {puntaje == puntaje2 && <p>Tie! Have the same points</p>} </p>
                <p> {puntaje > puntaje2 && <p>{nombreJugador} win the game with {puntaje} points</p>} </p>
                <p> {puntaje2 > puntaje && <p>{nombreJugador2} win the game with {puntaje2} points</p>} </p>
            </p>

            <button onClick={volverAInicio}>
                Start Again
            </button>


        </div>
    );
}

export default Felicitaciones;
