import React, { useState } from "react";
import "./ListaNotas.css";



function ListaDeNotas() {

    const [lista, setLista] = useState([]);
    const [proceso, setproceso] = useState([]);
    const [finalizada, setFinalizada] = useState([]);
    const [nota, setNota] = useState("");
    const [descripcion, setDescripcion] = useState("");

    const añadir = () => {
        const idNota = Math.max(...lista.map((nota) => nota.id),0) +1;
        const estado = 1;
        const nuevaNota = {
            id: idNota, 
            texto: nota, 
            desc:descripcion,
            estado:estado
        };
        setLista([...lista, nuevaNota]);
    }

    const anadirProceso = (idAnterior, texto, desc) => {
        const actualizarLista = lista.filter(nota => nota.id !== idAnterior);
            setLista(actualizarLista);
        const idNota = Math.max(...proceso.map((nota) => nota.id),0) +1;
        const estado = 2;
        const nuevaNota = {
                id: idNota, 
                texto: texto, 
                desc:desc,
                estado:estado
            };
        setproceso([...proceso, nuevaNota]);
    }

    const anadirFinal = (idAnterior, estadoAnterior, texto, desc) => {
        switch (estadoAnterior){
            case 1:
                const actualizarLista = lista.filter(nota => nota.id !== idAnterior);
                setLista(actualizarLista);
                break;
            case 2:
                const actualizarProceso = proceso.filter(nota => nota.id !== idAnterior);
                setproceso(actualizarProceso);
                break;
        }
        const idNota = Math.max(...finalizada.map((nota) => nota.id),0) +1;
        const estado = 3;
        const nuevaNota = {
                id: idNota, 
                texto: texto, 
                desc:desc,
                estado:estado
            };
            setFinalizada([...finalizada, nuevaNota]);
    }

    const borrar = (idAEliminar, estado) => {
        switch(estado){
            case 1:
                const actualizarLista = lista.filter(nota => nota.id !== idAEliminar);
                setLista(actualizarLista);
                break;
            case 2:
                const actualizarProceso = proceso.filter(nota => nota.id !== idAEliminar);
                setproceso(actualizarProceso);
                break;
            case 3:
                const actualizarFinal = finalizada.filter(nota => nota.id !== idAEliminar);
                setFinalizada(actualizarFinal);
                break;
        }
    }


    return (

        <>
        <div className="contenedorLN">
            <h1 className="titulo">NOTES LIST</h1>

            <section className="cuadro">
                <input placeholder="Task" value={nota} onChange={(e) => setNota(e.target.value)}></input>
                <input placeholder="Description" value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></input>
            </section>
            <section className="mainBoton">
                <button className="botonLN" onClick={añadir}>Add note</button>
            </section>
            

            <div className="ListasCont">
                <ul>
                    <h2>General list</h2>
                    <p className="tareas">
                    {lista.map((nota) => (
                        <li  key={nota.id}>
                            <h3>{nota.id}- {nota.texto}</h3>
                            <p>{nota.desc}</p>
                            <button className="botonLN" onClick={() => anadirProceso(nota.id, nota.texto, nota.desc)} >In progress</button>
                            <button className="botonLN" onClick={() => anadirFinal(nota.id, nota.estado, nota.texto, nota.desc)} >Finished</button>
                            <button className="botonLN" onClick={() => borrar(nota.id, nota.estado)}>Delete</button>
                        </li>
                    ))}
                    </p>
                </ul>

                <ul>
                    <h2>In progress</h2>
                    <p className="tareas">
                    {proceso.map((nota) => (
                        <li key={nota.id}>
                            <h3>{nota.id}- {nota.texto}</h3>
                            <p>{nota.desc}</p>
                            <button className="botonLN" onClick={() => anadirFinal(nota.id, nota.estado, nota.texto, nota.desc)} >Finished</button>
                            <button className="botonLN" onClick={() => borrar(nota.id, nota.estado)}>Delete</button>
                        </li>
                    ))}
                    </p>
                </ul>

                <ul>
                    <h2>Finished</h2>
                    <p className="tareas">
                    {finalizada.map((nota) => (
                        <li key={nota.id}>
                            <h3>{nota.id}- {nota.texto}</h3>
                            <p>{nota.desc}</p>
                            <button className="botonLN" onClick={() => borrar(nota.id, nota.estado)}>Delete</button>
                        </li>
                    ))}
                    </p>
                </ul>
            </div>

        </div>
            
        </>
    )
}

export default ListaDeNotas;