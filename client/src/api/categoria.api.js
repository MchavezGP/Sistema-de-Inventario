import axios from 'axios';
export const getCategoriasRequest = async () =>
  await axios.get('http://localhost:5000/categoria');
export const createCategoriaRequest= async (categoria) =>
  await axios.post('http://localhost:5000/categoria', categoria);
export const deleteCategoriaRequest= async (id) =>
  await axios.delete(`http://localhost:5000/categoria/${id}`);
  export const updateCategoriaRequest = async (id, newFields) =>
  await axios.put(`http://localhost:5000/categoria/${id}`, newFields);
export const getCategoriaRequest = async (id) =>
  await axios.get(`http://localhost:5000/categoria/${id}`);