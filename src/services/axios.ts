/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import envConfig from '@src/config/env.config';
import { API_ROUTES } from '@src/constants/api-routes.constant';
import { RefreshTokenResponse } from '@src/models/auth.model';

export interface BaseResponse<T> {
  success: boolean;
  errors: any[];
  data: T;
}

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
  const responseBody = response.data as BaseResponse<T>;
  return responseBody.data;
};

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem(envConfig.auth.refreshTokenKey);
    if (!refreshToken) {
      throw new Error('No refresh token found');
    }

    const response = await publicApi.post<RefreshTokenResponse>(API_ROUTES.AUTH.REFRESH_TOKEN, {
      refreshToken,
    });

    const { accessToken } = response;
    localStorage.setItem(envConfig.auth.tokenKey, accessToken);
    return accessToken;
  } catch (_error) {
    localStorage.removeItem(envConfig.auth.tokenKey);
    localStorage.removeItem(envConfig.auth.refreshTokenKey);
    localStorage.removeItem(envConfig.auth.userKey);
  }
};

const handleError = async (error: any) => {
  const originalRequest = error.config;

  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;

    try {
      const newAccessToken = await refreshToken();
      if (!newAccessToken) {
        throw new Error('Failed to refresh token');
      }

      originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
      return privateApi.request(originalRequest);
    } catch (refreshError) {
      return Promise.reject(refreshError);
    }
  }

  if (error.response) {
    switch (error.response.status) {
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
