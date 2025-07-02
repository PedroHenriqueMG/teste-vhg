import { Env } from '@env';
import axios from 'axios';
import { getToken } from '@/lib/auth/utils';

export const client = axios.create({
  baseURL: Env.API_URL,
});

client.interceptors.request.use(
  async (config) => {
    const token = await getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
