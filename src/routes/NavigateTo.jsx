import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import Loader from "../components/common/Loader";

export default function NavigateTo({ redirectTo }) {
  const [loader, setLoader] = useState(1);
  const location = useLocation();

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

  return loader ? (
    <Loader />
  ) : (
    <Navigate
      to={location.state ? location.state : redirectTo}
      state={location.pathname}
      replace
    />
  );
}
