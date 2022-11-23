import axios from 'axios';
export const getEntradasRequest= async () =>
  await axios.get('https://sistema-de-inventario-production.up.railway.app/entrada');
export const createEntradaRequest = async (entrada) =>
  await axios.post('https://sistema-de-inventario-production.up.railway.app/entrada', entrada);
export const deleteEntradaRequest = async (id) =>
  await axios.delete(`https://sistema-de-inventario-production.up.railway.app/entrada/${id}`);
