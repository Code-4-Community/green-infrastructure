import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface AuthContextType {
  userID: string | null;
  token: string | null; // Store JWT token
  isAuthenticated: boolean;
  login: (user: string, token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize state from localStorage (if available)
  const [userID, setUser] = useState<string | null>(() => localStorage.getItem('userID'));
  const [token, setToken] = useState<string | null>(() => localStorage.getItem('token'));
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => !!localStorage.getItem('token'));

  useEffect(() => {
    // Update localStorage whenever state changes
    if (userID && token) {
      localStorage.setItem('userID', userID);
      localStorage.setItem('token', token);
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('userID');
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  }, [userID, token]);

  const login = (user: string, token: string) => {
    setUser(user);
    setToken(token);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    localStorage.removeItem('userID');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ userID, token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
