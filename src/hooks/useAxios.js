import { useEffect } from "react";
import { api } from "../api";
import axios from "axios";

import useAuthContext from "./useAuthContext";

const useAxios = () => {
  const { auth, setAuth } = useAuthContext();

  useEffect(() => {
    //  intercept with request
    const requestIntercept = api.interceptors.request.use(
      (config) => {
        const authToken = auth?.token?.token;
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
        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          const refreshToken = auth?.token?.refreshToken;
          const response = await axios.post(
            `${import.meta.env.VITE_SERVER_BASE_URL}/auth/refresh-token`,
            { refreshToken }
          );
          const { token } = response.data;
          setAuth((prev) => ({
            ...prev,
            token: { ...prev.token, token: token },
          }));
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axios(originalRequest);
        }

        return Promise.reject(error);
      }
    );

    // clean up
    return () => {
      api.interceptors.request.eject(requestIntercept);
      api.interceptors.response.eject(responseIntercept);
    };
  }, [auth?.token?.refreshToken, auth?.token?.token, setAuth]);

  return { api };
};

export default useAxios;
