import { useEffect } from "react";
import { api } from "../api";
import axios from "axios";

import useAuthContext from "./useAuthContext";
import useLocalStorage from "./useLocalStorage";

const useAxios = () => {
  const { setAuth } = useAuthContext();
  const { value, setValue } = useLocalStorage("auth");

  useEffect(() => {
    //  intercept with request
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = value?.token?.accessToken;
        if (authToken) {
          config.headers.Authorization = `Bearer ${authToken}`;
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      }
    );

    // intercept with response
    const responseIntercept = api.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalRequest = error.config;
        if (
          error.response.status === 401 ||
          (error.response.status === 403 && !originalRequest._retry)
        ) {
          originalRequest._retry = true;
          const refreshToken = value?.token?.refreshToken;
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
            { refreshToken }
          );

          const { accessToken } = response.data;

          setValue((prev) => ({
            ...prev,
            token: { ...prev.token, accessToken: accessToken },
          }));

          setAuth((prev) => ({
            ...prev,
            token: { ...prev.token, accessToken: accessToken },
          }));

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axios(originalRequest);
        }

        if (error?.response?.data?.error === "User not found") {
          setValue(null);
          setAuth({});
        }

        return Promise.reject(error);
      }
    );

    // clean up
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [
    setAuth,
    setValue,
    value?.token?.accessToken,
    value?.token?.refreshToken,
  ]);

  return { api };
};

export default useAxios;
