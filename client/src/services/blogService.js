import api from './api.js';

export const getAllBlogs = async (category = '', search = '') => {
  const params = new URLSearchParams();
  if (category && category !== 'all') params.append('category', category);
  if (search) params.append('search', search);

  const response = await api.get(`/api/blog/all?${params}`);
  return response.data;
};

export const getBlogById = async (id) => {
  const response = await api.get(`/api/blog/${id}`);
  return response.data;
};

export const createBlog = async (blogData) => {
  const response = await api.post('/api/blog/create', blogData);
  return response.data;
};

export const deleteBlog = async (id) => {
  const response = await api.delete(`/api/blog/${id}`);
  return response.data;
};