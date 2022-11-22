import { useState, useEffect } from 'react';
import {
  deleteCategoriaRequest,
  getCategoriasRequest,
  getCategoriaRequest,
  updateCategoriaRequest,
} from '../api/categoria.api';

export const useCategorias = () => {
  const [categorias, setCategorias] = useState([]);
  useEffect(() => {
    const getCategorias = async () => {
      const response = await getCategoriasRequest();
      setCategorias(response.data);
    };
    getCategorias();
  }, [categorias]);
  const deleteCategoria = async (id) => {
    try {
      const response = await deleteCategoriaRequest(id);
      setCategorias(
        categorias.filter((categoria) => categoria.idCategoria !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };
  const getCategoria = async (id) => {
    try {
      const response = await getCategoriaRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
  const updateCategoria = async (id, newFields) => {
    try {
      const response = await updateCategoriaRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    categorias,
    deleteCategoria,
    getCategoria,
    updateCategoria,
  };
};
