import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../api/auth';
import { setUnauthorizedHandler } from '../api/api';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [authError, setAuthError] = useState(null);
  const [sessionActive, setSessionActive] = useState(true);

  const {
    data: currentUser,
    isLoading,
    error
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: getCurrentUser,
    retry: false,
    enabled: sessionActive
  });

  const logout = useCallback(async () => {
    await logoutUser();
    setSessionActive(false);
    setAuthError(null);
    queryClient.setQueryData(['currentUser'], null);
  }, [queryClient]);

  useEffect(() => {
    setUnauthorizedHandler(() => {
      logout();
      setAuthError(new Error('Session expired'));
    });

    return () => setUnauthorizedHandler(null);
  }, [logout]);

  const loginMutation = useMutation({
    mutationFn: ({ username, password }) => loginUser(username, password),
    onSuccess: (user) => {
      setAuthError(null);
      setSessionActive(true);
      queryClient.setQueryData(['currentUser'], user);
      queryClient.invalidateQueries(['currentUser']);
    }
  });

  const registerMutation = useMutation({
    mutationFn: (payload) => registerUser(payload),
    onSuccess: (user) => {
      setAuthError(null);
      setSessionActive(true);
      queryClient.setQueryData(['currentUser'], user);
      queryClient.invalidateQueries(['currentUser']);
    }
  });

  const value = useMemo(
    () => ({
      currentUser,
      loading: isLoading,
      error: authError || error,
      login: (username, password) => loginMutation.mutateAsync({ username, password }),
      register: (payload) => registerMutation.mutateAsync(payload),
      logout
    }),
    [currentUser, isLoading, error, loginMutation, registerMutation, authError, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
