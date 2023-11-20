import React, { useState, useEffect } from 'react';
import data from './data/animales.json'

function Juego({ nombreJugador, nombreJugador2, puntaje, puntaje2, setPuntaje, setPuntaje2, alTerminar, rondaActual, setRondaActual, segundoTurno, setSegundoTurno, comodin, setComodin, comodin2, setComodin2 }) {
    const [animalObjetivo, setAnimalObjetivo] = useState({
        "img": "",
        "code": "",
        "name": "",
        "description": "",
        "sound": ""
    });

    const [opciones, setOpciones] = useState([]);
    const [esCorrecto, setEsCorrecto] = useState(null);
    const [rondasTotales, setRondasTotales] = useState(Math.floor(Math.random() * 6) + 5);
    const [puedeHacerClic, setPuedeHacerClic] = useState(true);

    const obtenerAnimalAleatorio = () => {
        //const animales = ['cat', 'dog', 'cow', 'lion', 'giraffe', 'zebra'];
        const animales = data;
        const indiceAleatorio = Math.floor(Math.random() * animales.length);
        return animales[indiceAleatorio];
    };

    const obtenerOpcionesAleatorias = () => {
        const animalCorrecto = obtenerAnimalAleatorio();
        let opcionesAleatorias = [animalCorrecto];

        while (opcionesAleatorias.length < 3) {
            const opcion = obtenerAnimalAleatorio();
            if (!opcionesAleatorias.some((animal) => animal.code === opcion.code)) {
                opcionesAleatorias.push(opcion);
            }
            //.some() verifica si al menos un objeto del array cumple con la condicion
            //en este caso verificara si los codigos de ambos objetos son distintos
            //en caso de que no haya duplicado va a agregar la opcion a el aray de opciones aleatorias
        }

        opcionesAleatorias = opcionesAleatorias.sort(() => Math.random() - 0.5);

        setOpciones(opcionesAleatorias);
        setAnimalObjetivo(animalCorrecto);
    };

    const verificarRespuesta = (animalSeleccionado) => {

        if (segundoTurno == true) {
            if (animalSeleccionado.name === animalObjetivo.name) {
                setEsCorrecto(true);
                setPuntaje2(puntaje2 + 1);
                let animalSound = new Audio(animalObjetivo.sound);
                animalSound.play();
            } else {
                setEsCorrecto(false);
            }
            setPuedeHacerClic(false);
        }
        else {
            if (animalSeleccionado.name === animalObjetivo.name) {
                setEsCorrecto(true);
                setPuntaje(puntaje + 1);
                let animalSound = new Audio(animalObjetivo.sound);
                animalSound.play();
            } else {
                setEsCorrecto(false);
            }
            setPuedeHacerClic(false);
        }
    };

    const siguienteRonda = () => {


        if (rondaActual < rondasTotales || segundoTurno) {
            //setRondaActual(rondaActual + 1);
            setEsCorrecto(null);
            setPuedeHacerClic(true);
            obtenerOpcionesAleatorias();
            console.log(segundoTurno);
            if (!segundoTurno) {
                setSegundoTurno(true);
                console.log(segundoTurno);
                
            }
            else {
                setSegundoTurno(false);
                setRondaActual(rondaActual + 1);
                
            }
        }
        else {
            alTerminar(puntaje, puntaje2);
        }
    };

    const opcionesDeshabilitadas = esCorrecto !== null;

    function usarComodin() {
        if (segundoTurno == false) {
            if (comodin == false) {
                setComodin(true)
                for (let i = 0; i < opciones.length; i++) {
                    if (opciones.length >= 3) {
                        if (opciones[i].name !== animalObjetivo.name) {
                            const auxiliar = opciones.filter(opcion => opcion.name != opciones[i].name)
                            setOpciones(auxiliar)
                        }
                    }
                }
            }
        }
        if (segundoTurno == true){
            if (comodin2 == false) {
                setComodin2(true)
                for (let i = 0; i < opciones.length; i++) {
                    if (opciones.length >= 3) {
                        if (opciones[i].name !== animalObjetivo.name) {
                            const auxiliar = opciones.filter(opcion => opcion.name != opciones[i].name)
                            setOpciones(auxiliar)
                        }
                    }
                }
            }
        }
    }


    useEffect(() => {
        obtenerOpcionesAleatorias();
    }, []);

    return (
        <div className='juego'>
            <section className='LadoA'>
                <h1>{!segundoTurno && nombreJugador} {segundoTurno && nombreJugador2}, What animal is it?</h1>
                <p>Actual round: {rondaActual}</p>
                <img src={animalObjetivo.img} alt={animalObjetivo.name} />
            </section>

            <section className='LadoB'>
                <p className='clue'>Clue: {animalObjetivo.description}</p>
                <div>
                    {opciones.map((animal) => (
                        <button className='botonOpciones'
                            key={animal.code}
                            onClick={() => verificarRespuesta(animal)}
                            disabled={!puedeHacerClic || opcionesDeshabilitadas}
                        >
                            {animal.name}
                        </button>
                    ))}
                </div>
                <div className='respuesta'>
                    {esCorrecto === true && <p>Correct!</p>}
                    {esCorrecto === false && <p>Incorrect!</p>}
                </div>

                
                <section className='otrosbotones'>
                    <button onClick={siguienteRonda}>Next</button>
                    {!segundoTurno && comodin == false? <button onClick={usarComodin}>Use Help</button> : <lavel></lavel>}
                    {segundoTurno && comodin2 == false? <button onClick={usarComodin}>Use Help</button> : <lavel></lavel>}
                </section>
                

                
            </section>
        </div>
    );
}



export default Juego;