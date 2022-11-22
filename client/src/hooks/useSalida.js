
import { useState, useEffect } from 'react';
import { getSalidasRequest, deleteSalidaRequest } from '../api/salida.api';

export const useSalida= () => {
  const [salidas, setSalidas] = useState([]);
  useEffect(() => {
    const getSalidas= async () => {
      const response = await getSalidasRequest();
      setSalidas(response.data);
    };
    getSalidas();
  }, [salidas]);
 const deleteSalida = async (id) => {
    try {
      const response = await deleteSalidaRequest(id);
      setSalidas(salidas.filter((salida) => salida.idSalida!== id));
    } catch (error) {
      console.error(error);
    }
  };
  return {
    salidas,deleteSalida
  };
};

