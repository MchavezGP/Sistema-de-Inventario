import axios from 'axios';
export const getAreasRequest = async () =>
  await axios.get('http://localhost:5000/area');
export const createAreaRequest= async (area) =>
  await axios.post('http://localhost:5000/area', area);
export const deleteAreaRequest = async (id) =>
  await axios.delete(`http://localhost:5000/area/${id}`);

