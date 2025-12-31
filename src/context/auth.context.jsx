import { createContext, useState, useEffect, useContext } from 'react';
import { getToken, setToken, clearToken } from '@/utils/token.js';
import api from '@/lib/QueryHandler.js';
import { Login as loginService } from '@/services/auth.js';
import { Logout as logoutService } from '@/services/auth.js';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setTokenState] = useState(getToken());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.setAuthToken(token);
  }, [token]);

  const login = async (payload, callbacks = {}) => {
    await loginService(payload, {
      onStart: setLoading,
      onSuccess: (data) => {
        setToken(data.token);
        setTokenState(data.token);
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
        clearToken();
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
      value={{
        user,
        token,
        loading,
        login,
        logout,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
