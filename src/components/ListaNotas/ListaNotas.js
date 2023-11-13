import React, { useState } from "react";
//import "./listaNotas.css";

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

    const anadirProceso = () => {
        const idNota = Math.max(...proceso.map((nota) => nota.id),0) +1;
        const estado = 2;
        const nuevaNota = {
                id: idNota, 
                texto: nota, 
                desc:descripcion,
                estado:estado
            };
        setproceso([...proceso, nuevaNota]);
    }

    const anadirFinal = () => {
        const idNota = Math.max(...finalizada.map((nota) => nota.id),0) +1;
        const estado = 3;
        const nuevaNota = {
                id: idNota, 
                texto: nota, 
                desc:descripcion,
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
        <div className="contenedor">
            <h1>LISTA NOTAS</h1>

            <section className="cuadro">
                <input value={nota} onChange={(e) => setNota(e.target.value)}></input>
                <input value={descripcion} onChange={(e) => setDescripcion(e.target.value)}></input>
                <section className="botones">
                    <button onClick={añadir}>Agregar nota</button>
                </section>
            </section>

            <ul>
                <h3>Lista general</h3>
                {lista.map((nota, index) => (
                    <li key={nota.id}>
                        {nota.id}- {nota.texto}
                        <button onClick={anadirProceso} >Enproceso</button>
                        <button onClick={anadirFinal} >Finalizar</button>
                        <button onClick={() => borrar(nota.id, nota.estado)}>Eliminar</button>
                        <p>{nota.desc}</p>
                        
                    </li>
                ))}
            </ul>

            <ul>
                <h3>En proceso</h3>
                {proceso.map((nota, index) => (
                    <li key={nota.id}>
                        {nota.id}- {nota.texto}
                        <button onClick={anadirFinal} >Finalizar</button>
                        <button onClick={() => borrar(nota.id, nota.estado)}>Eliminar</button>
                        <p>{nota.desc}</p>
                        
                    </li>
                ))}
            </ul>

            <ul>
                <h3>Finalizadas</h3>
                {finalizada.map((nota, index) => (
                    <li key={nota.id}>
                        {nota.id}- {nota.texto}
                        <button onClick={() => borrar(nota.id, nota.estado)}>Eliminar</button>
                        <p>{nota.desc}</p>
                        
                    </li>
                ))}
            </ul>
        </div>
            
        </>
    )
}

export default ListaDeNotas;