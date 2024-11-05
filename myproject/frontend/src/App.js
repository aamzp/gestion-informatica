import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ArticleList from './ArticleList';
import Header from './Header';
import ArticleForm from './ArticleForm';
import EditArticlePopup from './EditArticlePopup';
import './App.css';

const App = () => {
  const [data, setData] = useState([]);
  const [popupVisible, setPopupVisible] = useState(false);
  const [articleToEdit, setArticleToEdit] = useState(null); // Estado para el artículo a editar

  const [searchTerm, setSearchTerm] = useState(''); // Estado para el término de búsqueda
  const [filteredData, setFilteredData] = useState([]); // Estado para los artículos filtrados

  const fetchArticles = () => {
      axios.get('http://127.0.0.1:8000/api/articulos/')
          .then(response => setData(response.data))
          .catch(error => console.error('Error al obtener los artículos:', error));
  };

  useEffect(() => {
      fetchArticles();
  }, []);

  const handleArticleCreated = (newArticle) => {
      setData((prevData) => [...prevData, newArticle]);
  };

  const handleArticleDeleted = () => {
    setPopupVisible(true); // Muestra el popup
    setTimeout(() => setPopupVisible(false), 2000); // Oculta el popup después de 2 segundos
  };

  const handleEditRequested = (article) => {
      setArticleToEdit(article); // Establece el artículo a editar
      setPopupVisible(true); // Muestra el popup de edición
  };

  const handlePopupClose = () => {
      setPopupVisible(false);
      setArticleToEdit(null); // Limpia el artículo a editar
  };

  const handleArticleUpdated = (updatedArticle) => {
      setData((prevData) =>
          prevData.map((article) =>
              article.id === updatedArticle.id ? updatedArticle : article
          )
      );
  };

  const handleSearch = () => {
    const lowercasedTerm = searchTerm.toLowerCase();
    const filtered = data.filter(article =>
      article.nombre.toLowerCase().includes(lowercasedTerm) ||
      article.id.toString().includes(lowercasedTerm) // Busca por ID
    );
    setFilteredData(filtered);
  };

  const articlesToDisplay = searchTerm ? filteredData : data; // Usa los artículos filtrados si hay búsqueda


  return (
    <div>
      <Header />
      <ArticleForm onArticleCreated={handleArticleCreated} />

      {/* Barra de búsqueda */}
      <div>
        <input
          type="text"
          placeholder="Buscar por ID o Nombre"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Buscar</button>
      </div>

      {articlesToDisplay.length > 0 ? (
        <ArticleList
          articles={articlesToDisplay}
          onArticleUpdated={fetchArticles}
          onArticleDeleted={handleArticleDeleted}
          onEditRequested={handleEditRequested}
        />
      ) : (
          <div>No hay artículos.</div>
      )}
      {popupVisible && articleToEdit && (
          <EditArticlePopup
              article={articleToEdit}
              onClose={handlePopupClose}
              onArticleUpdated={handleArticleUpdated}
          />
      )}
      {popupVisible && !articleToEdit && (
          <div className="popup">Artículo eliminado correctamente</div>
      )}
    </div>
  );
};

export default App;