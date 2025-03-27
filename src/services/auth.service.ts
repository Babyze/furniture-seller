import { api } from './axios';
import envConfig from '@src/config/env.config';
import { API_ROUTES } from '@src/constants/api-routes.constant';
import { LoginRequest, LoginResponse } from '@src/models/auth.model';

class AuthService {
  private static instance: AuthService;

  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async login(data: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await api.post<LoginResponse>(API_ROUTES.AUTH.LOGIN, data);
      return response;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  }

  async logout(): Promise<void> {
    try {
      await api.post(API_ROUTES.AUTH.LOGOUT);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage
      localStorage.removeItem(envConfig.auth.tokenKey);
      localStorage.removeItem(envConfig.auth.refreshTokenKey);
      localStorage.removeItem('user');
    }
  }

  async refreshToken(): Promise<string> {
    try {
      const refreshToken = localStorage.getItem(envConfig.auth.refreshTokenKey);
      if (!refreshToken) {
        throw new Error('No refresh token found');
      }

      const response = await api.post<{ token: string }>(API_ROUTES.AUTH.REFRESH_TOKEN, {
        refreshToken,
      });

      return response.token;
    } catch (error) {
      console.error('Refresh token error:', error);
      throw error;
    }
  }

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      return JSON.parse(userStr);
    }
    return null;
  }

  getUserAccessToken() {
    const accessToken = localStorage.getItem(envConfig.auth.tokenKey);
    return accessToken;
  }

  isAuthenticated(): boolean {
    const token = this.getUserAccessToken();
    return !!token;
  }
}

export const authService = AuthService.getInstance();
