import { useContext } from "react";
import { AuthContext } from "../contexts";

export default function useAuthContext() {
  return useContext(AuthContext);
}
