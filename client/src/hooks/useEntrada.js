import { useState, useEffect } from 'react';
import { getEntradasRequest, deleteEntradaRequest } from '../api/entrada.api';

export const useEntrada = () => {
  const [entradas, setEntradas] = useState([]);
  useEffect(() => {
    const getEntradas = async () => {
      const response = await getEntradasRequest();
      setEntradas(response.data);
    };
    getEntradas();
  }, [entradas]);

  const deleteEntrada = async (id) => {
    try {
      const response = await deleteEntradaRequest(id);
      setEntradas(entradas.filter((entrada) => entrada.idEntrada !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return {
    entradas,
    deleteEntrada,
  };
};
