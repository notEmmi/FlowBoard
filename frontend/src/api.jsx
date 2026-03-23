/* API client module: centralizes frontend HTTP calls, access-token storage, and user-friendly error handling. */
const API = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const TOKEN_KEY = 'flowboard_token';
const AUTH_EXPIRED_EVENT = 'flowboard:auth-expired';

// parses error responses that may or may not be JSON, returning null if parsing fails
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

// formats error messages, preferring server detail over generic fallbacks; 5xx errors are kept vague intentionally
function formatErrorMessage({ status, payload, fallbackMessage }) {
  const serverMessage =
    payload?.detail ||
    payload?.message ||
    payload?.error ||
    '';

  if (typeof serverMessage === 'string' && serverMessage.trim()) {
    return serverMessage.trim();
  }

  // keep 5xx vague — avoid leaking internal server details to the UI
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

function emitAuthExpired() {
  window.dispatchEvent(new CustomEvent(AUTH_EXPIRED_EVENT));
}

export function onAuthExpired(handler) {
  window.addEventListener(AUTH_EXPIRED_EVENT, handler);
  return () => window.removeEventListener(AUTH_EXPIRED_EVENT, handler);
}

// base fetch wrapper — attaches auth header, parses errors, and throws typed ApiError on failure
export function api(path, options = {}) {
  const url = new URL(path, API).toString();
  const accessToken = getAccessToken();
  const hasAuthToken = Boolean(accessToken);
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
      // Treat 401 with an existing bearer token as an expired/invalid session.
      if (res.status === 401 && hasAuthToken) {
        clearAccessToken();
        emitAuthExpired();
      }

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

/* --- endpoint helpers --- */


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
  const browserTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC';

  return api('/api/projects', {
    method: 'POST',
    body: JSON.stringify({
      ...payload,
      timezone: browserTimeZone,
    }),
  });
}