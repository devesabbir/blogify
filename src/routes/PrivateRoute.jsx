/* eslint-disable react-refresh/only-export-components */

import NavigateTo from "./NavigateTo";
import useAuthContext from "../hooks/useAuthContext";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useAuthContext();

  const redirectTo = "/login";

  return isAuthenticated ? children : <NavigateTo redirectTo={redirectTo} />;
}
