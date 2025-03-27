import { authService } from '@src/services/auth.service';
import React, { useEffect, useState } from 'react';

import { Loading } from '@src/components/layouts/Loading';
import { AuthContext } from '@src/contexts/AuthContext.context';
import { LoginRequest, User } from '@src/models/auth.model';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const user = authService.getCurrentUser();
    if (user) {
      setUser(user);
    }
    setIsLoading(false);
  }, []);

  const login = async (data: LoginRequest) => {
    try {
      const response = await authService.login(data);
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const getUserAccessToken = () => {
    return authService.getUserAccessToken();
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        logout,
        getUserAccessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
