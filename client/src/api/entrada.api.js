import axios from 'axios';
export const getEntradasRequest= async () =>
  await axios.get('http://localhost:5000/entrada');
export const createEntradaRequest = async (entrada) =>
  await axios.post('http://localhost:5000/entrada', entrada);
export const deleteEntradaRequest = async (id) =>
  await axios.delete(`http://localhost:5000/entrada/${id}`);
