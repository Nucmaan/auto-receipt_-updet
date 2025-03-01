"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    // Check localStorage on initial load
    if (typeof window !== 'undefined') {
      const savedUser = localStorage.getItem('auth_user');
      return savedUser ? JSON.parse(savedUser) : null;
    }
    return null;
  });

  const login = async (username: string, password: string): Promise<boolean> => {
    // Manual authentication check
    if (username === "admin" && password === "123456") {
      const userData = { 
        id: '1', 
        email: 'admin@system.com', 
        role: 'admin' 
      };
      setUser(userData);
      localStorage.setItem('auth_user', JSON.stringify(userData));
      return true;
    }
    return false;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 