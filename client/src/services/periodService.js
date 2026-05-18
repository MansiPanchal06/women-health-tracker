import api from './api.js';

export const addPeriod = async (periodData) => {
  const response = await api.post('/api/period/add', periodData);
  return response.data;
};

export const getPeriods = async () => {
  const response = await api.get('/api/period/all');
  return response.data;
};

export const getPredictions = async () => {
  const response = await api.get('/api/period/predict');
  return response.data;
};

export const deletePeriod = async (id) => {
  const response = await api.delete(`/api/period/${id}`);
  return response.data;
};