const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user'; // New key for user object

export const getToken = () => localStorage.getItem(TOKEN_KEY) || null;
export const setToken = (token) => localStorage.setItem(TOKEN_KEY, token);

// Add these for User persistence
export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};
export const setUserLocal = (user) =>
  localStorage.setItem(USER_KEY, JSON.stringify(user));

export const clearAuth = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};
