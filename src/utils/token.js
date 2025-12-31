const TOKEN_KEY = 'auth_token';

/**
 * Get the saved token from localStorage
 */
export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY) || null;
  } catch (error) {
    console.error('Failed to get token:', error);
    return null;
  }
};

/**
 * Save a token to localStorage
 * @param {string} token
 */
export const setToken = (token) => {
  try {
    localStorage.setItem(TOKEN_KEY, token);
  } catch (error) {
    console.error('Failed to set token:', error);
  }
};

/**
 * Clear the token from localStorage
 */
export const clearToken = () => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch (error) {
    console.error('Failed to clear token:', error);
  }
};
