import axios from 'axios';
export const getMarcasRequest= async () =>
  await axios.get('https://sistema-de-inventario-production.up.railway.app/marca');
export const createMarcaRequest= async (marca) =>
  await axios.post('https://sistema-de-inventario-production.up.railway.app/marca', marca);
export const deleteMarcaRequest= async (id) =>
  await axios.delete(`https://sistema-de-inventario-production.up.railway.app/marca/${id}`);
  export const updateMarcaRequest = async (id, newFields) =>
  await axios.put(`https://sistema-de-inventario-production.up.railway.app/marca/${id}`, newFields);
export const getMarcaRequest = async (id) =>
  await axios.get(`https://sistema-de-inventario-production.up.railway.app/marca/${id}`);