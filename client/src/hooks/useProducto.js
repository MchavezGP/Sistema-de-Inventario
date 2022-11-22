import { useState, useEffect } from 'react';
import { getProductosRequest, deleteProductoRequest, updateProductoRequest, getProductoRequest} from '../api/producto.api';

export const useProductos = () => {
  const [productos , setProductos] = useState([]);
  useEffect(() => {
    const getProductos = async () => {
      const response = await getProductosRequest();
      setProductos(response.data);
    };
    getProductos();
  }, [productos]);

   const deleteProducto = async (id) => {
    try {
      const response = await deleteProductoRequest(id);
      setProductos(productos.filter((producto) => producto.idProducto !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const getProducto = async (id) => {
    try {
      const response = await getProductoRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
 const updateProducto = async (id, newFields) => {
    try {
      const response = await updateProductoRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return {
    productos, deleteProducto, getProducto, updateProducto
  };
};

