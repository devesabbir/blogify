import { useEffect, useState } from "react";
import useLocalStorage from "./useLocalStorage";

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [auth, setAuth] = useState({});
  const { value } = useLocalStorage("auth");

  useEffect(() => {
    if (value?.token) {
      setIsAuthenticated(true);
      setAuth(value);
    }
  }, [value, value?.token]);

  return { isAuthenticated, setIsAuthenticated, auth, setAuth };
}
