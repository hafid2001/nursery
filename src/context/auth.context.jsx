import { createContext, useState, useEffect, useContext } from 'react';
import {
  getToken,
  setToken,
  getUser,
  setUserLocal,
  clearAuth,
} from '@/utils/token.js';
import api from '@/lib/QueryHandler.js';
import {
  Login as loginService,
  Logout as logoutService,
} from '@/services/auth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(getUser());
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState(false);


  const refreshUser = async () => {
      await api.request('/auth/me', {
        onSuccess : (res) => {
          setUserLocal(res.user);
          setUser(res.user);     
        },
        onError : () => {
          console.error('Auth refresh failed', err);
        }

      }, { method: 'GET' });
   
  };

  useEffect(() => {
    if (token) {
      api.setAuthToken(token);
    }
  }, [token]);

  const login = async (payload, callbacks = {}) => {
    await loginService(payload, {
      onStart: callbacks.onStart || setLoading,
      onSuccess: (data) => {
        setToken(data.token);
        setTokenState(data.token);
        setUserLocal(data.user); 
        setUser(data.user);
        if (callbacks.onSuccess) callbacks.onSuccess(data);
      },
      onError: callbacks.onError,
      onFinal: callbacks.onFinal,
    });
  };

  const logout = async (callbacks = {}) => {
    await logoutService({
      onStart: setLoading,
      onSuccess: (data) => {
        clearAuth(); 
        setTokenState(null);
        setUser(null);
        if (callbacks.onSuccess) callbacks.onSuccess(data);
      },
      onError: callbacks.onError,
      onFinal: callbacks.onFinal,
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, token, loading, login, logout, setUser , refreshUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
