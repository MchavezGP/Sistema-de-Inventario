import axios from 'axios';
export const getEntradaProductosRequest= async () =>
  await axios.get('http://localhost:5000/entradaproducto');
export const createEntradaProductoRequest= async (entradaproducto) =>
  await axios.post('http://localhost:5000/entradaproducto', entradaproducto);
export const deleteEntradaProductoRequest= async (id) =>
  await axios.delete(`http://localhost:5000/entradaproducto/${id}`);

