import { useContext } from "react";
import { ProfileContext } from "../contexts";

export default function useProfile() {
  return useContext(ProfileContext);
}
