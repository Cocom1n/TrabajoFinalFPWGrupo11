import React, { useState } from 'react';

function ComparadorDePrecios (){

      const ComparadorPrecios = () => {
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

          // Limpia los campos después de agregar el producto
          setProductoNombre('');
          setProductoPrecio('');
          setProductoDistribuidor('');
        };

        const MinimoPrecio = (distribuidor) => {
          const productosDistribuidor = ListaProductos.filter(producto => producto.distribuidor === distribuidor);
          const productoPrecioMin = productosDistribuidor.reduce((min, producto) => (min.precio < producto.precio ? min : producto), {});

          return productoPrecioMin;
        };

        return (
          <div>
            <h2>Comparador de Precios</h2>

            <div>
              <h3>Agregar Producto</h3>
              <div>
                <label>Producto:</label>
                <input type="text" value={productoNombre} onChange={(e) => setProductoNombre(e.target.value)} />
              </div>
              <div>
                <label>Precio:</label>
                <input type="number" value={productoPrecio} onChange={(e) => setProductoPrecio(e.target.value)} />
              </div>
              <div>
                <label>Distribuidor:</label>
                <input type="text" value={productoDistribuidor} onChange={(e) => setProductoDistribuidor(e.target.value)} />
              </div>
              <button onClick={AñadirProducto}>Agregar a la Lista</button>
            </div>

            <div>
              <h3>Lista de Productos</h3>
              <ul>
                {ListaProductos.map((producto, index) => (
                  <li key={index}>
                    {producto.nombre} - {producto.distribuidor}: ${producto.precio}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3>Menor precio por Distribuidor</h3>
              <ul>
                {[...new Set(ListaProductos.map(producto => producto.distribuidor))].map((distribuidor, index) => (
                  <li key={index}>
                    {distribuidor}: {MinimoPrecio(distribuidor).nombre} - ${MinimoPrecio(distribuidor).precio}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      };

}

export default ComparadorDePrecios;