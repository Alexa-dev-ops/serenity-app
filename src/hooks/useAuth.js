import { useState, useEffect } from "react";
import { api, setToken, clearToken } from "../utils/api";

export function useAuth() {
  const [user, setUser]       = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("srnty_token");
    if (!token) { setChecked(true); return; }
    api("GET", "/auth/me")
      .then((u) => { setUser(u); setChecked(true); })
      .catch(() => { clearToken(); setChecked(true); });
  }, []);

  const login = async (email, password) => {
    const data = await api("POST", "/auth/login", { email, password });
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const register = async (form) => {
    const data = await api("POST", "/auth/register", form);
    setToken(data.token);
    setUser(data.user);
    return data.user;
  };

  const logout = () => {
    clearToken();
    setUser(null);
  };

  return { user, checked, login, register, logout };
}