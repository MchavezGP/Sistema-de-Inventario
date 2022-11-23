import axios from 'axios';
export const getSalidasRequest= async () =>
  await axios.get('https://sistema-de-inventario-production.up.railway.app/salida');
export const createSalidaRequest= async (salida) =>
  await axios.post('https://sistema-de-inventario-production.up.railway.app/salida', salida);
export const deleteSalidaRequest= async (id) =>
  await axios.delete(`https://sistema-de-inventario-production.up.railway.app/salida/${id}`);