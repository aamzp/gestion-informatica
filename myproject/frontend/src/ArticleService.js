import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/articulos/';

export const getArticuloById = (id) => {
    return axios.get(`${API_URL}${id}/`);
};

export const updateArticulo = (id, updatedData) => {
    return axios.put(`${API_URL}${id}/`, updatedData);
};

export const deleteArticulo = (id) => {
    return axios.delete(`${API_URL}${id}/`);
};