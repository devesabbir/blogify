import { useEffect, useState } from "react";

const useLocalStorage = (key) => {
  const [value, setValue] = useState(
    localStorage.getItem(key) && JSON.parse(localStorage.getItem(key))
  );

  useEffect(() => {
    if (key) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [value, key]);

  return { value, setValue };
};

export default useLocalStorage;
