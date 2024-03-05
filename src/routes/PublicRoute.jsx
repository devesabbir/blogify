import { useContext } from "react";

import NavigateTo from "./NavigateTo";
import { AuthContext } from "../contexts";

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useContext(AuthContext);
  const redirectTo = "/";

  return isAuthenticated ? <NavigateTo redirectTo={redirectTo} /> : children;
}
