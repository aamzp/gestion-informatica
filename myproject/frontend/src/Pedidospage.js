import React, { useState, useEffect } from "react";
import axios from "axios";
import AddPedidoForm from "./AddPedidoForm"; // Importamos el formulario
import SearchBar from "./SearchBar"; // Importamos el nuevo componente de búsqueda

import './App.css';

const Pedidospage = () => {
  const [pedidos, setPedidos] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [filteredPedidos, setFilteredPedidos] = useState([]); // Estado para los pedidos filtrados

  // Función para obtener los pedidos desde la API
  useEffect(() => {
    const fetchPedidos = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/pedidos/");
        setPedidos(response.data);
      } catch (error) {
        console.error("Error al obtener los pedidos", error);
      }
    };
    fetchPedidos();
  }, []);

  // Función para manejar la creación de un pedido y actualizar la lista
  const handlePedidoCreated = (newPedido) => {
    setPedidos((prevPedidos) => [...prevPedidos, newPedido]);
  };

  // Función para filtrar los pedidos
  const handleSearch = () => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = pedidos.filter(pedido =>
      pedido.producto.toLowerCase().includes(lowercasedTerm) ||
      pedido.empresa.toLowerCase().includes(lowercasedTerm) ||
      pedido.estado.toLowerCase().includes(lowercasedTerm) // Busca por estado también
    );
    setFilteredPedidos(filtered);
  };

  const pedidosToDisplay = searchTerm ? filteredPedidos : pedidos; // Usa los pedidos filtrados si hay búsqueda

  // Función para asignar el precio según la empresa y el producto
  const calculatePrice = (pedido) => {
    let price = 0;
    if (pedido.empresa === 'INSUMOMAX') {
      if (pedido.producto === 'TALLARINES' || pedido.producto === 'ARROZ') {
        price = 2500; // Precio para tallarines y arroz
      }
    } else if (pedido.empresa === 'ARTICULOSPRO') {
      if (pedido.producto === 'PLATOS') {
        price = 3000;
      } else if (pedido.producto === 'CUCHARAS') {
        price = 4000;
      }
    }
    return price * pedido.cantidad_productos; // Multiplicamos por la cantidad
  };

  // Sumar los precios de los pedidos (precio calculado * cantidad)
  const totalPrice = pedidosToDisplay.reduce((total, pedido) => {
    return total + calculatePrice(pedido);
  }, 0);

  // Función para manejar la eliminación de un pedido
  const handleDeletePedido = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/pedidos/${id}/`);
      setPedidos((prevPedidos) => prevPedidos.filter((pedido) => pedido.id !== id));
    } catch (error) {
      console.error("Error al eliminar el pedido", error);
    }
  };

  return (
    <div>
      <h1>Gestión de Pedidos</h1>

      {/* Barra de búsqueda */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      {/* Botón de búsqueda */}
      <button onClick={handleSearch}>Buscar</button>

      {/* Pasamos handlePedidoCreated como prop para que AddPedidoForm pueda usarlo */}
      <AddPedidoForm onPedidoCreated={handlePedidoCreated} />

      <h2>Pedidos</h2>

      <table>
        <thead>
          <tr>
            <th>Fecha Envío</th>
            <th>Empresa</th>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th>Precio Total</th> {/* Nueva columna para el precio total */}
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {pedidosToDisplay.map((pedido) => {
            const precioTotal = calculatePrice(pedido); // Calculamos el precio total por pedido
            return (
              <tr key={pedido.id}>
                <td>{pedido.fecha_envio}</td>
                <td>{pedido.empresa}</td>
                <td>{pedido.producto}</td>
                <td>{pedido.cantidad_productos}</td>
                <td>{calculatePrice(pedido) / pedido.cantidad_productos}</td> {/* Precio unitario */}
                <td>{precioTotal}</td> {/* Mostrar el precio total calculado */}
                <td>{pedido.estado}</td>
                <td>
                {/* Botón de eliminación */}
                <button onClick={() => handleDeletePedido(pedido.id)}>Eliminar</button>
              </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {/* Mostrar el precio total */}
      <div className="total-price">
        <h3>Total de los pedidos: ${totalPrice.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default Pedidospage;
