import { ERROR_MESSAGES } from './errorCodes';

export function normalizeError(error) {
  // Network / fetch error
  if (error instanceof TypeError) {
    return {
      status: 0,
      code: 'NETWORK_ERROR',
      message: 'Network error. Please check your connection.',
      errors: null,
    };
  }

  const code =
    error?.code || Object.values(error?.errors || {})?.[0]?.[0] || 'DEFAULT';

  return {
    status: error?.status || 0,
    code,
    message: ERROR_MESSAGES[code] || ERROR_MESSAGES.DEFAULT,
    errors: error?.errors || null,
  };
}
