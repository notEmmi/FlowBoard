const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const TOKEN_KEY = 'flowboard_token';


export function setAccessToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}


export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}


export function clearAccessToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function api(path, options = {}) {
  const url = new URL(path, API).toString();
  const accessToken = getAccessToken();

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  }).then(async (res) => {
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(`API ${res.status}: ${text || res.statusText}`);
    }
    return res.json();
  });
}


export async function register(payload) {
  return api('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}


export async function login(payload) {
  const data = await api('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  if (data?.access_token) {
    setAccessToken(data.access_token);
  }

  return data;
}


export async function requestPasswordReset(payload) {
  return api('/api/auth/password-reset/request', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}


export async function confirmPasswordReset(payload) {
  return api('/api/auth/password-reset/confirm', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
