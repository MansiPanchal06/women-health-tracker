import api from './api.js';

export const updateProfile = async (profileData) => {
  const response = await api.put('/api/auth/profile/update', profileData);
  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await api.put('/api/auth/password/change', passwordData);
  return response.data;
};