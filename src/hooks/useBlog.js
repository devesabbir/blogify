import { useContext } from "react";
import { BlogContext } from "../contexts";

export default function useBlog() {
  return useContext(BlogContext);
}
