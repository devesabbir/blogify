/* eslint-disable no-unused-vars */

import { AuthContext } from "../contexts";
import { useAuth } from "../hooks/useAuth";

export default function AuthProvider({ children }) {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
