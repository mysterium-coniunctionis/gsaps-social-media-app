import React, { createContext, useContext, useMemo, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { loginUser, registerUser, logoutUser, getCurrentUser } from '../api/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();
  const [token, setToken] = useState(() => localStorage.getItem('gsaps_token'));

  const {
    data: currentUser,
    isLoading,
    error
  } = useQuery({
    queryKey: ['currentUser', token],
    queryFn: getCurrentUser,
    enabled: Boolean(token)
  });

  const loginMutation = useMutation({
    mutationFn: ({ username, password }) => loginUser(username, password),
    onSuccess: () => {
      const newToken = localStorage.getItem('gsaps_token');
      setToken(newToken);
      queryClient.invalidateQueries(['currentUser']);
    }
  });

  const registerMutation = useMutation({
    mutationFn: (payload) => registerUser(payload),
    onSuccess: () => {
      const newToken = localStorage.getItem('gsaps_token');
      setToken(newToken);
      queryClient.invalidateQueries(['currentUser']);
    }
  });

  const logout = async () => {
    await logoutUser();
    setToken(null);
    queryClient.removeQueries(['currentUser']);
  };

  const value = useMemo(
    () => ({
      currentUser,
      loading: isLoading,
      error,
      login: (username, password) => loginMutation.mutateAsync({ username, password }),
      register: (payload) => registerMutation.mutateAsync(payload),
      logout
    }),
    [currentUser, isLoading, error, loginMutation, registerMutation]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
