import axios from 'axios';
import { ROUTES } from '@/constants/routes';

if (!process.env.NEXT_PUBLIC_API_URL) {
  throw new Error(
    'NEXT_PUBLIC_API_URL não está configurado! Crie o arquivo .env.local com NEXT_PUBLIC_API_URL'
  );
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const PUBLIC_PATHS: string[] = [ROUTES.HOME, ROUTES.LOGIN, ROUTES.REGISTER];

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      const requestUrl = error.config?.url ?? '';
      const isSessionRequest = requestUrl.includes('/auth/me');
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
      const isPublicPath = PUBLIC_PATHS.includes(currentPath);

      if (
        typeof window !== 'undefined' &&
        !isSessionRequest &&
        !isPublicPath &&
        !window.location.pathname.includes('/login') &&
        !window.location.pathname.includes('/register')
      ) {
        window.location.href = '/login';
      }
    }
    if (error.response?.status === 500) {
      console.error('Server error:', error.response.data);
    }
    return Promise.reject(error);
  }
);

export default api;
