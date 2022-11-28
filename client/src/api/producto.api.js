import axios from 'axios';
export const getProductosRequest= async () =>
  await axios.get('https://sistema-de-inventario-production.up.railway.app/producto');
  export const getKardexRequest= async () =>
  await axios.get('https://sistema-de-inventario-production.up.railway.app/kardex');
export const createProductoRequest = async (producto) =>
  await axios.post('https://sistema-de-inventario-production.up.railway.app/producto', producto);
export const deleteProductoRequest = async (id) =>
  await axios.delete(`https://sistema-de-inventario-production.up.railway.app/producto/${id}`);
  export const updateProductoRequest = async (id, newFields) =>
  await axios.put(`https://sistema-de-inventario-production.up.railway.app/producto/${id}`, newFields);
export const getProductoRequest = async (id) =>
  await axios.get(`https://sistema-de-inventario-production.up.railway.app/producto/${id}`);