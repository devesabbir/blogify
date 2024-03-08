import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import Loader from "../components/common/Loader";

export default function NavigateTo({ redirectTo }) {
  const [loader, setLoader] = useState(1);

  useEffect(() => {
    let timer = setInterval(() => {
      if (loader > 0) {
        setLoader((prev) => prev - 1);
      }
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [loader]);

  return loader ? <Loader /> : <Navigate to={redirectTo} replace />;
}
