import React, { useState } from "react";
//import "./listaNotas.css";

function ListaDeNotas() {

    const [lista, setLista] = useState([]);
    const [nota, setNota] = useState("");
    const[checkbox, setCheckbox] = useState(false);

    const añadir = () => {
        if (checkbox) {
            const idNota = Math.max(...lista.map((nota) => nota.id),0) +1;
            const nuevaNota = {
                id: idNota, 
                texto: nota, 
                estado: true
            };
            setLista([...lista, nuevaNota]);
        }
    }

    const borrar = (idAEliminar) => {
        const nuevaLista = lista.filter(nota => nota.id !== idAEliminar);

    // const borrar = (notaAEliminar) => {
    //     let repeatIndex = -1;
    //     lista.forEach((nota, index) => {
    //         if (nota.mensaje == notaAEliminar.mensaje)
    //         {
    //             repeatIndex = index;
    //         }
    //     });
    //     const nuevaLista = lista.filter((nota, index) => index != repeatIndex);
        setLista(nuevaLista);
    }

    const verificarCasilla = () => {
        setCheckbox(!checkbox);
    }

    return (

        <>
        <div className="contenedor">
            <h1>LISTA NOTAS</h1>

            <section className="cuadro">
                <input value={nota} onChange={(e) => setNota(e.target.value)}></input>
                <section className="botones">
                    <input type="checkbox" checked={checkbox} onChange={verificarCasilla}/>
                    <button onClick={añadir}>Agregar nota</button>
                </section>
            </section>

            <ul class="lista">
                {lista.map((nota, index) => (
                    <li key={nota.id}>
                        {nota.id}- {nota.texto}
                        <button onClick={() => borrar(nota.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
            
        </>
    )
}

export default ListaDeNotas;