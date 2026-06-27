export const API_BASE = "http://localhost:4000/api";

export const getToken = () => localStorage.getItem("srnty_token");
export const setToken = (t) => localStorage.setItem("srnty_token", t);
export const clearToken = () => localStorage.removeItem("srnty_token");

export function authHeaders() {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
  };
}

export async function api(method, path, body) {
  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: authHeaders(),
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}