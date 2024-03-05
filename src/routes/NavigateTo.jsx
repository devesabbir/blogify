import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import loaderImage from "./../assets/loader.gif";

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

  return loader ? (
    <div className="h-[100vh] grid place-items-center">
      <img src={loaderImage} alt="" />
    </div>
  ) : (
    <Navigate to={redirectTo} replace />
  );
}
