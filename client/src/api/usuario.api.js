import axios from 'axios';
export const getUsuarioRequest= async () =>
  await axios.get('https://sistema-de-inventario-production.up.railway.app/usuario');
export const createUsuarioRequest= async (usuario) =>
  await axios.post('https://sistema-de-inventario-production.up.railway.app/usuario', usuario);


