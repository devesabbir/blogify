import NavigateTo from "./NavigateTo";
import useAuthContext from "../hooks/useAuthContext";

export default function PublicRoute({ children }) {
  const { isAuthenticated } = useAuthContext();
  const redirectTo = "/";

  return isAuthenticated ? <NavigateTo redirectTo={redirectTo} /> : children;
}
