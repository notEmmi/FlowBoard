/* JWT utility: decode and parse JWT tokens to extract expiration time. */

/* Decode JWT payload without verification (safe for client-side expiration checks). */
export function decodeJWT(token) {
  if (!token) return null;

  try {
    const parts = token.split('.');
    if (parts.length !== 3) return null;

    const payload = JSON.parse(atob(parts[1]));
    return payload;
  } catch {
    return null;
  }
}

/* Get token expiration time in milliseconds from now. Returns null if expired or invalid. */
export function getTokenExpiresIn(token) {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return null;

  const expiresAtMs = payload.exp * 1000; // exp is in seconds, convert to ms
  const nowMs = Date.now();
  const expiresInMs = expiresAtMs - nowMs;

  return expiresInMs > 0 ? expiresInMs : 0;
}

/* Get token expiration timestamp in milliseconds. */
export function getTokenExpirationTime(token) {
  const payload = decodeJWT(token);
  if (!payload || !payload.exp) return null;
  return payload.exp * 1000;
}

/* Check if token is expired. */
export function isTokenExpired(token) {
  const expiresIn = getTokenExpiresIn(token);
  return expiresIn === null || expiresIn === 0;
}
