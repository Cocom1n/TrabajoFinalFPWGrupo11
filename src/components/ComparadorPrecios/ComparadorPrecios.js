import React, { useEffect,useState } from 'react';
import './Comparador.css';

function ComparadorDePrecios (){
 
  const [ListaProductos, setLista] = useState([]);
  const [ListaMasBarato, setListaMasBarato] = useState([]);
  const [Nombre, setNombre] = useState('');
  const [Precio, setPrecio] = useState('');
  const [Distribuidor, setDistribuidor] = useState('');

    const AñadirProducto = () => {
      if (Nombre && Precio && Distribuidor){
        const idProducto = Math.max(...ListaProductos.map((producto) => producto.id),0) +1;
        const nuevoProducto = {
            id: idProducto,
            nombre: Nombre,
            precio: parseFloat(Precio),
            marca: Distribuidor,
        }
        setLista([...ListaProductos, nuevoProducto])
    }else {
        alert('Debes llenar todos los campos para comenzar!');
    }
  }

  const BorrarListas = () =>{
      setLista([]);
      setListaMasBarato([]);
  }

  useEffect(() => {
      CalcularPrecioMinimo()
      console.log("Se actualizo la lsita con precios mas baratos");
    }, [ListaProductos]);

  const CalcularPrecioMinimo = () => {
      const productosUnicos = Array.from(new Set(ListaProductos.map(producto => producto.nombre)));

      const productosMasBaratos = productosUnicos.map(nombreProducto => {
          const productosConNombre = ListaProductos.filter(producto => producto.nombre === nombreProducto);
          const precioMinimo = Math.min(...productosConNombre.map(producto => producto.precio));

          return productosConNombre.find(producto => producto.precio === precioMinimo);
      });
      setListaMasBarato(productosMasBaratos);
  }

  return(
      <div className='comparador'>
            <h1>Comparador de precios</h1>
        <section className='inputsComparador'>
            <select id="nombre" value={Nombre} onChange={(e) => setNombre(e.target.value)}>
                <option value="" disabled>Seleccionar</option>
                <option value="Azucar">Azucar</option>
                <option value="Pan">Pan</option>
                <option value="Sal">Sal</option>
                <option value="Dulce">Dulce</option>
                <option value="Leche">Leche</option>
                <option value="Queso">Queso</option>
                <option value="Yogurt">Yogurt</option>
                <option value="Fideos">Fideos</option>
                <option value="Arroz">Arroz</option>
                <option value="Harina">Harina</option>
            </select>
            <input type="number" min="0" value={Precio} onChange={(e) => setPrecio(e.target.value)} />
            <select id="marca" value={Distribuidor} onChange={(e) => setDistribuidor(e.target.value)}>
                <option value="" disabled>Seleccionar</option>
                <option value="Dia">Dia</option>
                <option value="Vea">Vea</option>
                <option value="Carrefour">Carrefour</option>
                <option value="Changomás">Changomás</option>
                <option value="Comodín">Comodín</option>
            </select>
        </section>
        <section className='botonesComparador'>
            <button onClick={AñadirProducto} className="botones">Agregar a la lista</button>
            <button onClick={BorrarListas} className="botones">Borrar las listas</button>
        </section>
        
        <section className='listas'>
            <ul>
                <h3>Lista de los productos</h3>
                {ListaProductos.map((producto) => (
                    <li key={producto.id}>
                        {producto.nombre} - {producto.marca}: ${producto.precio}
                    </li>
                ))

                }
            </ul>
            <ul>
                <h3>Productos de menor precio</h3>
                {ListaMasBarato.map((producto) => (
                    <li key={producto.id}>
                        {producto.nombre} - {producto.marca}: ${producto.precio}
                    </li>
                ))}

            </ul>
        </section>
    </div>
  );
}

export default ComparadorDePrecios;