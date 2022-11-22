import axios from 'axios';
export const getUsuarioRequest= async () =>
  await axios.get('http://localhost:5000/usuario');
export const createUsuarioRequest= async (usuario) =>
  await axios.post('http://localhost:5000/usuario', usuario);


