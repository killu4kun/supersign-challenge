import axios from 'axios';
import { getSession } from 'next-auth/react';

const api = axios.create({
  baseURL: '/api',
});

api.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.user) {
    config.headers.Authorization = `Bearer ${session.user.id}`;
  }

  return config;
});

export default api;
