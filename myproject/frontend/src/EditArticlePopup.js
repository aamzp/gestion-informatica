// src/EditArticlePopup.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EditArticlePopup = ({ article, onClose, onArticleUpdated }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');

    useEffect(() => {
        if (article) {
            setNombre(article.nombre);
            setDescripcion(article.descripcion);
            setCategoria(article.categoria);
            setCantidad(article.cantidad);
            setPrecio(article.precio);
        }
    }, [article]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.put(`http://127.0.0.1:8000/api/articulos/${article.id}/`, {
                nombre,
                descripcion,
                categoria,
                cantidad: parseInt(cantidad, 10),
                precio: parseFloat(precio),
            });

            onArticleUpdated(response.data); // Llama a la función para actualizar la lista de artículos
            onClose(); // Cierra el popup
        } catch (error) {
            console.error('Error al editar el artículo:', error);
        }
    };

    return (
        <div className="popup">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Nombre"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    required
                />
                <textarea
                    placeholder="Descripción"
                    value={descripcion}
                    onChange={(e) => setDescripcion(e.target.value)}
                    required
                />
                <select
                    value={categoria}
                    onChange={(e) => setCategoria(e.target.value)}
                    required
                >
                    <option value="INSUMO">INSUMO</option>
                    <option value="IMPLEMENTO">IMPLEMENTO</option>
                </select>
                <input
                    type="number"
                    placeholder="Cantidad"
                    value={cantidad}
                    onChange={(e) => setCantidad(e.target.value)}
                    required
                />
                <input
                    type="number"
                    step="0.01"
                    placeholder="Precio"
                    value={precio}
                    onChange={(e) => setPrecio(e.target.value)}
                    required
                />
                <button type="submit">Guardar</button>
                <button type="button" onClick={onClose}>Cancelar</button>
            </form>
        </div>
    );
};

export default EditArticlePopup;