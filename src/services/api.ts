// src/services/api.ts
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8081/core';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: AxiosError | null, token: string | null): void => {
  failedQueue.forEach(({ resolve, reject }) => {
    if (error) {
      reject(error);
    } else {
      resolve(token);
    }
  });
  failedQueue = [];
};

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const storedTokens = localStorage.getItem('auth_tokens');
    if (storedTokens) {
      try {
        const tokens = JSON.parse(storedTokens);
        if (tokens.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${tokens.accessToken}`;
        }
      } catch (e) {
        console.error('Erro ao parse dos tokens:', e);
        localStorage.removeItem('auth_tokens');
      }
    }
    return config;
  },
  (err) => Promise.reject(err instanceof Error ? err : new Error(String(err)))
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (err: AxiosError) => {
    const originalRequest = err.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    if (err.response?.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            return api(originalRequest);
          })
          .catch((error) => Promise.reject(error instanceof Error ? error : new Error(String(error))));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const storedTokens = localStorage.getItem('auth_tokens');
      if (!storedTokens) {
        processQueue(err, null);
        isRefreshing = false;
        window.location.href = '/login';
        return Promise.reject(err);
      }

      try {
        const tokens = JSON.parse(storedTokens);
        if (!tokens.refreshToken) {
          throw new Error('No refresh token available');
        }
        const response = await axios.post(`${API_BASE_URL}/persona/auth/refresh`, {
          refreshToken: tokens.refreshToken,
        });

        const newTokens = {
          accessToken: response.data.accessToken,
          refreshToken: response.data.refreshToken ?? tokens.refreshToken,
          idToken: response.data.idToken ?? tokens.idToken,
        };

        localStorage.setItem('auth_tokens', JSON.stringify(newTokens));

        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
        }

        processQueue(null, newTokens.accessToken);
        return api(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError as AxiosError, null);
        localStorage.removeItem('auth_tokens');
        localStorage.removeItem('auth_user');
        window.location.href = '/login';
        return Promise.reject(refreshError instanceof Error ? refreshError : new Error(String(refreshError)));
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default api;
