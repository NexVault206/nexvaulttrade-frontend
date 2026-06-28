// Global API configuration — update this based on your backend URL
const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
  ? 'http://localhost:5000/api'
  : 'https://nexvaulttrade-backend.onrender.com/api'; // Update after deploying backend

// Helper: Get auth token from localStorage
function getAuthToken() {
  return localStorage.getItem('nvt_token');
}

// Helper: Get admin token from localStorage
function getAdminToken() {
  return localStorage.getItem('nvt_adminToken');
}

// Helper: API fetch with auth header
async function apiFetch(endpoint, options = {}) {
  const token = options.isAdmin ? getAdminToken() : getAuthToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };
  if (token) headers['x-auth-token'] = token;

  const response = await fetch(API_BASE + endpoint, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.msg || `API error: ${response.status}`);
  }

  return response.json();
}
