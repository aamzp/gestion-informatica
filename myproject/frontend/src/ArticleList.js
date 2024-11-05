import React from 'react';
import ArticleItem from './ArticleItem';
import { deleteArticulo } from './ArticleService';

const ArticleList = ({  articles,
                        onArticleUpdated,
                        onEditRequested,
                        onArticleDeleted}) => {
    const handleDelete = async (id) => {
        try {
            await
            deleteArticulo(id);
            onArticleDeleted(); // Llama a la función para mostrar el popup
            onArticleUpdated(); // Refresca la lista de artículos después de eliminar
        } catch (error) {
            console.error('Error al eliminar el artículo:', error);
        }
    };

    const handleEdit = (article) => {
        // Lógica para editar el artículo (puede ser abrir un formulario modal, etc.)
        onEditRequested(article)

        console.log('Editando artículo:', article);
    };

    return (
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Categoría</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Fecha Registro</th>
                    <th>Última Modificación</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {articles.map((article) => (
                    <ArticleItem
                        key={article.id}
                        article={article}
                        onDelete={handleDelete}
                        onEdit={handleEdit}
                    />
                ))}
            </tbody>
        </table>
    );
};

export default ArticleList;