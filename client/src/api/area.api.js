import axios from 'axios';
export const getAreasRequest = async () =>
  await axios.get('https://sistema-de-inventario-production.up.railway.app/area');
export const createAreaRequest= async (area) =>
  await axios.post('https://sistema-de-inventario-production.up.railway.app/area', area);
export const deleteAreaRequest = async (id) =>
  await axios.delete(`https://sistema-de-inventario-production.up.railway.app/area/${id}`);

