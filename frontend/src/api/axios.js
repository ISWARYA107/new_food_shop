import axios from 'axios';

const api = axios.create({
  baseURL:'https://new-food-shop.onrender.com',
});

// Attach the saved JWT (if any) to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cf_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
