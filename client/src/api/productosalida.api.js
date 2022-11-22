import axios from 'axios';
export const getProductosSalidasRequest= async () =>
  await axios.get('http://localhost:5000/productossalidas');
export const createProductoSalidaRequest= async (productosalida) =>
  await axios.post('http://localhost:5000/productosalida', productosalida);
export const deleteProductoSalidaRequest= async (id) =>
  await axios.delete(`http://localhost:5000/productosalida/${id}`);

