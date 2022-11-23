import axios from 'axios';
export const getProductosSalidasRequest= async () =>
  await axios.get('https://sistema-de-inventario-production.up.railway.app/productosalida');
export const createProductoSalidaRequest= async (productosalida) =>
  await axios.post('https://sistema-de-inventario-production.up.railway.app/productosalida', productosalida);
export const deleteProductoSalidaRequest= async (id) =>
  await axios.delete(`https://sistema-de-inventario-production.up.railway.app/productosalida/${id}`);

