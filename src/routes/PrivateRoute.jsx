/* eslint-disable react-refresh/only-export-components */
import { useContext } from "react";
import NavigateTo from "./NavigateTo";
import { AuthContext } from "../contexts";

export default function PrivateRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const redirectTo = "/login";

  return isAuthenticated ? children : <NavigateTo redirectTo={redirectTo} />;
}
