import { useState, useEffect } from 'react';
import { getUsuarioRequest } from '../api/usuario.api';

export const useUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  useEffect(() => {
    const getUsuarios = async () => {
      const response = await getUsuarioRequest();
      setUsuarios(response.data);
    };
    getUsuarios();
  }, []);

  return {
    usuarios,
  };
};


