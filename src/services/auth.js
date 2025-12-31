import { getToken, setToken } from '@/utils/token';
import api from '../lib/QueryHandler';

export const registerParent = async (
  payload,
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    '/parent/signup',
    { onStart, onSuccess, onError, onFinal },
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
};

export const Login = async (
  payload,
  { onStart, onSuccess, onError, onFinal } = {}
) => {
  return api.request(
    '/login',
    {
      onStart,
      onSuccess: (data) => {
        setToken(data.token);
        if (onSuccess) onSuccess(data);
      },
      onError,
      onFinal,
    },
    {
      method: 'POST',
      body: JSON.stringify(payload),
    }
  );
};

export const Logout = async ({ onStart, onSuccess, onError, onFinal } = {}) => {
  const token = getToken();
  if (!token) {
    if (onError) onError(new Error('No token found'));
    return;
  }

  return api.request(
    '/logout',
    {
      onStart,
      onSuccess: (data) => {
        clearToken();
        if (onSuccess) onSuccess(data);
      },
      onError,
      onFinal,
    },
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
