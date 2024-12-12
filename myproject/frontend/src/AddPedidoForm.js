import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const AddPedidoForm = ({ onPedidoCreated }) => {
    const [empresa, setEmpresa] = useState('INSUMOMAX');
    const [producto, setProducto] = useState('TALLARINES');
    const [cantidad, setCantidad] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log({ empresa, producto, cantidad_productos: parseInt(cantidad, 10) });

                


        try {
            const response = await axios.post('http://127.0.0.1:8000/api/pedidos/', {
                empresa,
                producto,
                cantidad_productos: parseInt(cantidad, 10), // Asegúrate de que sea un número
            });

            // Llama a la función onPedidoCreated para actualizar la lista de pedidos
            if (onPedidoCreated && typeof onPedidoCreated === 'function') {
                onPedidoCreated(response.data);
            }

            setEmpresa('INSUMOMAX');
            setProducto('TALLARINES');
            setCantidad('');
        } catch (error) {
            console.error('Error al crear el pedido:', error.response ? error.response.data : error.message);
        }
    };

    return (
        <div className="form-container">
            <h2>Agregar Pedido</h2>
            <form onSubmit={handleSubmit} className="pedido-form">
                <div className="form-group">
                    <label htmlFor="empresa">Empresa</label>
                    <select
                        id="empresa"
                        value={empresa}
                        onChange={(e) => setEmpresa(e.target.value)}
                        className="input-field"
                    >
                        <option value="INSUMOMAX">INSUMOMAX</option>
                        <option value="ARTICULOSPRO">ARTICULOSPRO</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="producto">Producto</label>
                    <select
                        id="producto"
                        value={producto}
                        onChange={(e) => setProducto(e.target.value)}
                        className="input-field"
                    >
                        {empresa === 'INSUMOMAX' ? (
                            <>
                                <option value="TALLARINES">Tallarines</option>
                                <option value="ARROZ">Arroz</option>
                            </>
                        ) : (
                            <>
                                <option value="PLATOS">Platos</option>
                                <option value="CUCHARAS">Cucharas</option>
                            </>
                        )}
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="cantidad">Cantidad</label>
                    <input
                        type="number"
                        id="cantidad"
                        value={cantidad}
                        onChange={(e) => setCantidad(e.target.value)}
                        required
                        placeholder="Cantidad de productos"
                        className="input-field"
                    />
                </div>

                <div className="form-actions">
                    <button type="submit" className="submit-button">Agregar Pedido</button>
                </div>
            </form>
        </div>
    );
};

export default AddPedidoForm;
