import { User, LoginRequest } from '@src/models/auth.model';
import { createContext } from 'react';

export interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  getUserAccessToken: () => string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
