import { useReducer } from "react";
import { BlogContext } from "../contexts";
import { BlogReducer, initialState } from "../reducers/BlogReducer";

export default function BlogProvider({ children }) {
  const [state, dispatch] = useReducer(BlogReducer, initialState);
  return (
    <BlogContext.Provider value={{ state, dispatch }}>
      {children}
    </BlogContext.Provider>
  );
}
