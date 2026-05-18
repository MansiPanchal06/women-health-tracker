import { createContext, useContext, useState, useEffect } from 'react';
import { loginUser, registerUser, getUserProfile } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const savedToken = localStorage.getItem('token');
      if (savedToken) {
        try {
          const data = await getUserProfile();
          setUser(data.data);
          setToken(savedToken);
        } catch (error) {
          localStorage.removeItem('token');
          setUser(null);
          setToken(null);
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const register = async (userData) => {
    const data = await registerUser(userData);
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      setUser(data.data);
      setToken(data.data.token);
    }
    return data;
  };

  const login = async (credentials) => {
    const data = await loginUser(credentials);
    if (data.success) {
      localStorage.setItem('token', data.data.token);
      setUser(data.data);
      setToken(data.data.token);
    }
    return data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken(null);
  };

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    register,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export default AuthContext;