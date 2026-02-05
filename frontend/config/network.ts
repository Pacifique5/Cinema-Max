// Network configuration for frontend
// Use localhost for consistency with admin panels

export const API_BASE_URL = 'http://localhost:3000';

export const getApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
};

export default {
  API_BASE_URL,
  getApiUrl
};