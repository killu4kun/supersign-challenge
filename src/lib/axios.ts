import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(async (config) => {
  const token = await fetch('/api/auth/session').then((res) => res.json());

  if (token?.accessToken) {
    config.headers.Authorization = `Bearer ${token.accessToken}`;
  }

  return config;
});

export default api;
