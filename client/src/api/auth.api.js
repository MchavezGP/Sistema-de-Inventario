import axios from 'axios';
// export const getUsuarioRequest= async () =>
//   await axios.get('http://localhost:5000/usuario');
export const createUserRequest= async (usuario) =>
  await axios.post('http://localhost:5000/user', usuario);
export const LoginRequest= async (usuario) =>
  await axios.post('http://localhost:5000/user', usuario);



