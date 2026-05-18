import api from './api.js';

export const addMood = async (moodData) => {
  const response = await api.post('/api/mood/add', moodData);
  return response.data;
};

export const getMoods = async () => {
  const response = await api.get('/api/mood/all');
  return response.data;
};

export const getMoodAnalytics = async () => {
  const response = await api.get('/api/mood/analytics');
  return response.data;
};

export const deleteMood = async (id) => {
  const response = await api.delete(`/api/mood/${id}`);
  return response.data;
};