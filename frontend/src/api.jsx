const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const TOKEN_KEY = 'flowboard_token';

function parseErrorPayload(rawPayload) {
  if (!rawPayload) {
    return null;
  }

  try {
    return JSON.parse(rawPayload);
  } catch {
    return null;
  }
}

function formatErrorMessage({ status, payload, fallbackMessage }) {
  const serverMessage =
    payload?.detail ||
    payload?.message ||
    payload?.error ||
    '';

  if (typeof serverMessage === 'string' && serverMessage.trim()) {
    return serverMessage.trim();
  }

  // Keep 5xx responses generic to avoid exposing internal details in the UI.
  if (status >= 500) {
    return 'Something went wrong. Please try again.';
  }

  return fallbackMessage;
}


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
  const fallbackMessage = options.errorMessage || 'Request failed';

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      ...(options.headers || {}),
    },
    ...options,
  }).then(async (res) => {
    if (!res.ok) {
      const rawResponse = await res.text().catch(() => '');
      const payload = parseErrorPayload(rawResponse);
      const userMessage = formatErrorMessage({
        status: res.status,
        payload,
        fallbackMessage: res.statusText || fallbackMessage,
      });

      console.error('API request failed', {
        url,
        method: options.method || 'GET',
        status: res.status,
        statusText: res.statusText,
        responseBody: rawResponse,
      });

      const error = new Error(userMessage || fallbackMessage);
      error.name = 'ApiError';
      error.status = res.status;
      error.userMessage = userMessage || fallbackMessage;
      error.responseBody = rawResponse;
      throw error;
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

export async function getProjects() {
  return api('/api/projects');
}

export async function createProject(payload) {
  return api('/api/projects', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}