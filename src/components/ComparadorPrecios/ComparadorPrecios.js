import React, { useState } from 'react';
import './Comparador.css';

function ComparadorDePrecios (){
 
    const [ListaProductos, setListaProducto] = useState([]);
    const [productoNombre, setProductoNombre] = useState('');
    const [productoPrecio, setProductoPrecio] = useState('');
    const [productoDistribuidor, setProductoDistribuidor] = useState('');

      const AñadirProducto = () => {
        const newProducto = {
          nombre: productoNombre,
          precio: parseFloat(productoPrecio),
          distribuidor: productoDistribuidor,
        };

      setListaProducto([...ListaProductos, newProducto]);

          setProductoNombre(''); // limpia los campos despues d agregar un producto
          setProductoPrecio('');
          setProductoDistribuidor('');
        };

      const MinimoPrecio = (distribuidor) => {
          const productosDistribuidor = ListaProductos.filter(producto => producto.distribuidor === distribuidor);
          const productoPrecioMin = productosDistribuidor.reduce((min, producto) => (min.precio < producto.precio ? min : producto), {});

          return productoPrecioMin;
        };

      const borrarListas = () => {  // limpia ambas listas
          setListaProducto([]);
          setProductoDistribuidor([]);
        };    

  return (
    <div>
      <h1 className="titulo">Comparador de Precios</h1>

        <div>
          <h3 className="tituloCarga">Agregue sus productos a la lista</h3>

          <div className="contenedores">
            <label>Producto:</label>
            <input type="text" value={productoNombre} onChange={(e) => setProductoNombre(e.target.value)} />
          </div>

          <div className="contenedores">
            <label>Precio:</label>
            <input type="number" value={productoPrecio} onChange={(e) => setProductoPrecio(e.target.value)} />
          </div>
          
          <div className="contenedores">
            <label>Distribuidor:</label>
            <input type="text" value={productoDistribuidor} onChange={(e) => setProductoDistribuidor(e.target.value)} />
          </div>
          
          <button onClick={AñadirProducto} className="botones">Agregar a la lista</button>
        </div>

        <div className="listas"> 
          <div className="listaProducto" >
            <h3>Lista de los productos</h3>
            <ul>
              {ListaProductos.map((producto, index) => (
                <li key={index}>
                  {producto.nombre} - {producto.distribuidor}: ${producto.precio}
                </li>
              ))}
            </ul>
          </div>

          <div className="listaMinPrecio">
            <h3>Menor precio por el distribuidor</h3>
           
            <ul>
              {[...new Set(ListaProductos.map(producto => producto.distribuidor))].map((distribuidor, index) => (
                <li key={index}>
                  {distribuidor}: {MinimoPrecio(distribuidor).nombre} - ${MinimoPrecio(distribuidor).precio}
                </li>
              ))}
           
            </ul>
          </div>
        </div>

        {/* boton para borrar las listas */}
      <button onClick={borrarListas} className="botones">Borrar las listas</button>          

    </div>        
  );
};

export default ComparadorDePrecios;