import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loginUser,
  registerUser,
  logoutUser,
  getCurrentUser,
  refreshTokens,
  oauthLogin
} from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const checkLoggedIn = async () => {
      setLoading(true);
      try {
        // Check if there's a token in localStorage
        const token = localStorage.getItem('gsaps_token');
        
        if (token) {
          const userData = await getCurrentUser();
          setCurrentUser(userData);
        }
      } catch (err) {
        console.error('Authentication error:', err);
        // Clear any invalid tokens
        localStorage.removeItem('gsaps_token');
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  const login = async (username, password, otpCode = '') => {
    setLoading(true);
    setError(null);
    
    try {
      const userData = await loginUser(username, password, otpCode);
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      setError(err.message || 'Failed to login');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    setError(null);
    
    try {
      const newUser = await registerUser(userData);
      setCurrentUser(newUser);
      return newUser;
    } catch (err) {
      setError(err.message || 'Failed to register');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    
    try {
      await logoutUser();
      setCurrentUser(null);
      localStorage.removeItem('gsaps_token');
    } catch (err) {
      console.error('Logout error:', err);
      setError(err.message || 'Failed to logout');
    } finally {
      setLoading(false);
    }
  };

  const refresh = async () => {
    try {
      await refreshTokens();
      const userData = await getCurrentUser();
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      console.error('Refresh error:', err);
      localStorage.removeItem('gsaps_token');
      localStorage.removeItem('gsaps_refresh_token');
      setCurrentUser(null);
      setError(err.message || 'Session expired');
      throw err;
    }
  };

  const loginWithProvider = async (provider) => {
    setLoading(true);
    setError(null);
    try {
      const userData = await oauthLogin(provider);
      setCurrentUser(userData);
      return userData;
    } catch (err) {
      setError(err.message || 'Failed to login with provider');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    refresh,
    loginWithProvider
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};