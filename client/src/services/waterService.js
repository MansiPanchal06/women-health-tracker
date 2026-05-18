import api from './api.js';

export const addWater = async (data) => {
  const response = await api.post('/api/water/add', data);
  return response.data;
};

export const getTodayWater = async () => {
  const response = await api.get('/api/water/today');
  return response.data;
};

export const getWaterHistory = async () => {
  const response = await api.get('/api/water/history');
  return response.data;
};

export const resetTodayWater = async () => {
  const response = await api.delete('/api/water/reset');
  return response.data;
};