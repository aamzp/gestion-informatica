import React, { useState } from 'react';
import axios from 'axios';

const ArticleForm = ({ onArticleCreated }) => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [categoria, setCategoria] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [precio, setPrecio] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://127.0.0.1:8000/api/articulos/', {
                nombre,
                descripcion,
                categoria,
                cantidad: parseInt(cantidad, 10), // Asegúrate de que sea un número
                precio: parseFloat(precio), // Asegúrate de que sea un número
            });

            onArticleCreated(response.data); // Llama a la función para actualizar la lista de artículos
            setNombre('');
            setDescripcion('');
            setCategoria('');
            setCantidad('');
            setPrecio('');
        } catch (error) {
            console.error('Error al crear el artículo:', error);
        }
    };

    return (
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
            <button type="submit">Agregar Artículo</button>
        </form>
    );
};

export default ArticleForm;