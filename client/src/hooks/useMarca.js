import { useState, useEffect } from 'react';
import { getMarcasRequest, deleteMarcaRequest, getMarcaRequest, updateMarcaRequest } from '../api/marca.api';

export const useMarcas = () => {
  const [marcas, setMarcas] = useState([]);
  useEffect(() => {
    const getMarcas = async () => {
      const response = await getMarcasRequest();
      setMarcas(response.data);
    };
    getMarcas();
  }, [marcas]);

 const deleteMarca = async (id) => {
    try {
      const response = await deleteMarcaRequest (id);
      setMarcas(marcas.filter((marca) => marca.idMarca !== id));
    } catch (error) {
      console.error(error);
    }
  };
  const getMarca = async (id) => {
    try {
      const response = await getMarcaRequest(id);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };
 const updateMarca = async (id, newFields) => {
    try {
      const response = await updateMarcaRequest(id, newFields);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return {
    marcas, deleteMarca, getMarca, updateMarca
  };
};
