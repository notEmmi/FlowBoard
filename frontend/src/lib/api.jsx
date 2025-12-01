const API = import.meta.env.VITE_API_URL;

export const api = (path, options = {}) =>
  fetch(API + path, options).then(res => res.json());
