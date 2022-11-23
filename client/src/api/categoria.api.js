import axios from 'axios';
export const getCategoriasRequest = async () =>
  await axios.get('https://sistema-de-inventario-production.up.railway.app/categoria');
export const createCategoriaRequest= async (categoria) =>
  await axios.post('https://sistema-de-inventario-production.up.railway.app/categoria', categoria);
export const deleteCategoriaRequest= async (id) =>
  await axios.delete(`https://sistema-de-inventario-production.up.railway.app/categoria/${id}`);
  export const updateCategoriaRequest = async (id, newFields) =>
  await axios.put(`https://sistema-de-inventario-production.up.railway.app/categoria/${id}`, newFields);
export const getCategoriaRequest = async (id) =>
  await axios.get(`https://sistema-de-inventario-production.up.railway.app/categoria/${id}`);