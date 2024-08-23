'use client';

import { useAuth } from '@/hooks/auth-hook';
import { AuthContext } from '@/context/auth-context';

export function AuthProvider({ children }) {
  const { token, login, logout, userId } = useAuth();

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        token: token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
