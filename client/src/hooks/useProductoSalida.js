import { useState, useEffect } from 'react';
import { deleteProductoSalidaRequest, getProductosSalidasRequest} from '../api/productosalida.api';

export const useProductoSalida= () => {
  const [productossalidas, setProductosSalidas] = useState([]);
  useEffect(() => {
    const getProductosSalidas= async () => {
      const response = await getProductosSalidasRequest();
      setProductosSalidas(response.data);
    };
    getProductosSalidas();
  }, []);
 const deleteProductoSalida= async (id) => {
    try {
      const response = await deleteProductoSalidaRequest(id);
      setProductosSalidas(productossalidas.filter((productosalida) => productosalida.idProductoSalida !== id));
    } catch (error) {
      console.error(error);
    }
  };
  return {
    productossalidas, deleteProductoSalida
  };
};


