/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import envConfig from '@src/config/env.config';

const defaultConfig: AxiosRequestConfig = {
  baseURL: envConfig.api.url,
  timeout: envConfig.api.timeout,
  headers: {
    'Content-Type': 'application/json',
  },
};

type AxiosInstanceWithResponse<T> = Omit<AxiosInstance, 'get' | 'post' | 'put' | 'delete'> & {
  get: <R = T>(url: string, config?: AxiosRequestConfig) => Promise<R>;
  post: <R = T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
  put: <R = T>(url: string, data?: any, config?: AxiosRequestConfig) => Promise<R>;
  delete: <R = T>(url: string, config?: AxiosRequestConfig) => Promise<R>;
};

export const publicApi: AxiosInstanceWithResponse<any> = axios.create(defaultConfig);

export const privateApi: AxiosInstanceWithResponse<any> = axios.create(defaultConfig);

privateApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(envConfig.auth.tokenKey);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const handleResponse = <T>(response: AxiosResponse<T>): T => {
  return response.data;
};

const handleError = (error: any) => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        localStorage.removeItem(envConfig.auth.tokenKey);
        localStorage.removeItem(envConfig.auth.refreshTokenKey);
        break;
      case 403:
        console.error('Access denied');
        break;
      case 404:
        console.error('Resource not found');
        break;
      case 500:
        console.error('Server error');
        break;
      default:
        console.error('An error occurred');
    }
  } else if (error.request) {
    console.error('No response received');
  } else {
    console.error('Error creating request');
  }
  return Promise.reject(error);
};

[publicApi, privateApi].forEach((api) => {
  api.interceptors.response.use(handleResponse, handleError);
});

export const api = {
  get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => privateApi.get<T>(url, config),

  post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    privateApi.post<T>(url, data, config),

  put: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
    privateApi.put<T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig): Promise<T> =>
    privateApi.delete<T>(url, config),

  // Public API methods
  public: {
    get: <T>(url: string, config?: AxiosRequestConfig): Promise<T> => publicApi.get<T>(url, config),

    post: <T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> =>
      publicApi.post<T>(url, data, config),
  },
};
