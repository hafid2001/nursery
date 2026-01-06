import { getToken, clearAuth } from '@/utils/token';
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
    '/auth/login',
    {
      onStart,
      onSuccess: (data) => {
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
    '/auth/logout',
    {
      onStart,
      onSuccess: (data) => {
        clearAuth();
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
