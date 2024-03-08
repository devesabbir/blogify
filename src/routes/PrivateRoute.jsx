/* eslint-disable react-refresh/only-export-components */

import NavigateTo from "./NavigateTo";
import { useAuth } from "../hooks/useAuth";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuth();

  const redirectTo = "/login";

  return isAuthenticated ? children : <NavigateTo redirectTo={redirectTo} />;
}
