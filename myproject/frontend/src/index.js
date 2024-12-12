import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";  // El componente de la página principal de artículos
import Pedidos from "./Pedidospage";  // El componente para la página de pedidos

// Envolvemos toda la aplicación en Router para que React Router funcione correctamente
ReactDOM.render(
  <Router>
    <Routes>
      {/* Ruta para la página principal que muestra los artículos */}
      <Route exact path="/" element={<App />} />
      
      {/* Ruta para la página de pedidos */}
      <Route path="/pedidos" element={<Pedidos />} />
    </Routes>
  </Router>,
  document.getElementById("root")
);