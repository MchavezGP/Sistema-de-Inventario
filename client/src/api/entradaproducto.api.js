import axios from 'axios';
export const getEntradaProductosRequest= async () =>
  await axios.get('https://sistema-de-inventario-production.up.railway.app/entradaproducto');
export const createEntradaProductoRequest= async (entradaproducto) =>
  await axios.post('https://sistema-de-inventario-production.up.railway.app/entradaproducto', entradaproducto);
export const deleteEntradaProductoRequest= async (id) =>
  await axios.delete(`https://sistema-de-inventario-production.up.railway.app/entradaproducto/${id}`);

