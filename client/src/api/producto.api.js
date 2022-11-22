import axios from 'axios';
export const getProductosRequest= async () =>
  await axios.get('https://sistema-de-inventario-production.up.railway.app/producto');
export const createProductoRequest = async (producto) =>
  await axios.post('http://localhost:5000/producto', producto);
export const deleteProductoRequest = async (id) =>
  await axios.delete(`http://localhost:5000/producto/${id}`);
  export const updateProductoRequest = async (id, newFields) =>
  await axios.put(`http://localhost:5000/producto/${id}`, newFields);
export const getProductoRequest = async (id) =>
  await axios.get(`http://localhost:5000/producto/${id}`);