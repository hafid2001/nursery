class QueryHandler {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.authToken = null; 
  }

  setAuthToken(token) {
    this.authToken = token;
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
      if (this.authToken) headers['Authorization'] = `Bearer ${this.authToken}`;

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

const api = new QueryHandler('http://localhost:5000');
export default api;
