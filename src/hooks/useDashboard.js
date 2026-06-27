import { useState, useCallback } from "react";
import { api } from "../utils/api";

export function useDashboard() {
  const [dash, setDash]   = useState(null);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setError(null);
      setDash(await api("GET", "/dashboard"));
    } catch (e) {
      setError(e.message);
    }
  }, []);

  return { dash, error, refresh };
}