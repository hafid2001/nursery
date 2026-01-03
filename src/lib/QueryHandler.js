import { getToken } from '@/utils/token';

class QueryHandler {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(
    endpoint,
    { onStart, onSuccess, onError, onFinal },
    options = {}
  ) {
    if (onStart) onStart(true);

    try {
      const headers = {
        'Content-Type': 'application/json',
        ...options.headers,
      };

      const token = getToken();
      if (token) headers['Authorization'] = `Bearer ${token}`;

      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: options.method || 'GET',
        headers,
        ...options,
      });

      const data = await response.json();
      if (!response.ok) throw { status: response.status, ...data };
      if (onSuccess) onSuccess(data);
    } catch (error) {
      if (onError) onError(error);
    } finally {
      if (onStart) onStart(false);
      if (onFinal) onFinal();
    }
  }
}

const api = new QueryHandler('https://nursery-backend-b7bv.onrender.com');
export default api;
