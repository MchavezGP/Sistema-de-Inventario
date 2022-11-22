import { useState, useEffect } from 'react';
import { getAreasRequest, deleteAreaRequest } from '../api/area.api';

export const useAreas = () => {
  const [areas , setAreas] = useState([]);
  useEffect(() => {
    const getAreas = async () => {
      const response = await getAreasRequest();
      setAreas(response.data);
    };
    getAreas();
  }, [areas]);

 const deleteArea = async (id) => {
    try {
      const response = await deleteAreaRequest (id);
      setAreas(areas.filter((area) => area.idArea !== id));
    } catch (error) {
      console.error(error);
    }
  };
  return {
    areas,deleteArea
  };
};

