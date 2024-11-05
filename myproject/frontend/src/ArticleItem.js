import React from 'react';

const ArticleItem = ({ article, onDelete, onEdit }) => {
    return (
        <tr>
            <td>{article.id}</td>
            <td>{article.nombre}</td>
            <td>{article.descripcion}</td>
            <td>{article.categoria}</td>
            <td>{article.cantidad}</td>
            <td>{article.precio}</td>
            <td>{article.fecha_registro}</td>
            <td>{article.ultima_modificacion}</td>
            <td>
                <button onClick={() => onEdit(article)}>Editar</button>
                <button onClick={() => onDelete(article.id)}>Eliminar</button>
            </td>
        </tr>
    );
};

export default ArticleItem;