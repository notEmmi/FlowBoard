const API = import.meta.env.VITE_API_URL;

export async function api(path, options = {}) {
  const url = new URL(path, API).toString();


  const res = await fetch (url, {
    headers: {
      "Content-Type": "application/json",
      ...API(options.headers || {}),
    },
    ...options,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`API ${res.status}: ${text || res.statusText}`);
  }

  return res.json();

}
