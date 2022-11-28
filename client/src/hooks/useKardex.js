import { useState, useEffect } from 'react';
import {  getKardexRequest } from '../api/producto.api';

export const useKardex = () => {
  const [kardex , setKardex] = useState([]);
  useEffect(() => {
    const getKardex = async () => {
      const response = await getKardexRequest();
      setKardex(response.data);
    };
    getKardex();
  }, [kardex]);


  return {
        kardex
  };
};

