import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; 

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
        <div className="form-container">
        <h2>Agregar Artículo</h2>
        <form onSubmit={handleSubmit} className="article-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Nombre del artículo"
              className="input-field"
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="descripcion">Descripción</label>
            <textarea
              id="descripcion"
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              required
              placeholder="Descripción del artículo"
              className="input-field"
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="categoria">Categoría</label>
            <select
              id="categoria"
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
              className="input-field"
              required
            >
              <option value="INSUMO">INSUMO</option>
              <option value="IMPLEMENTO">IMPLEMENTO</option>
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
              placeholder="Cantidad disponible"
              className="input-field"
            />
          </div>
  
          <div className="form-group">
            <label htmlFor="precio">Precio</label>
            <input
              type="number"
              id="precio"
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              required
              placeholder="Precio del artículo"
              className="input-field"
            />
          </div>
  
          <div className="form-actions">
            <button type="submit" className="submit-button">Agregar Artículo</button>
          </div>
        </form>
      </div>
    );
};

export default ArticleForm;