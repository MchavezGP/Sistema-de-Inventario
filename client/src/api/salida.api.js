import axios from 'axios';
export const getSalidasRequest= async () =>
  await axios.get('http://localhost:5000/salida');
export const createSalidaRequest= async (salida) =>
  await axios.post('http://localhost:5000/salida', salida);
export const deleteSalidaRequest= async (id) =>
  await axios.delete(`http://localhost:5000/salida/${id}`);