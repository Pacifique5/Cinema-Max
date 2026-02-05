// Network configuration for frontend
// Use the same IP as admin-mobile for consistency

export const API_BASE_URL = 'http://10.12.74.198:3000';

export const getApiUrl = (endpoint: string) => {
  return `${API_BASE_URL}${endpoint}`;
};

export default {
  API_BASE_URL,
  getApiUrl
};