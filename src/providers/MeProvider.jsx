import axios from "axios";
import React, { useEffect, useState } from "react";

export const MeContext = React.createContext({});

const MeProvider = ({ children }) => {
  const [me, setMe] = useState(null);
  const handleSetMe = (me) => setMe(me);
  const value = { me, handleSetMe };

  useEffect(() => {
    // Add a request interceptor
    const reqInterceptor = axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        config.headers.Authorization = `Bearer ${me ? me.token : ""}`;
        console.log("axios request interceptor success");
        return config;
      },
      function (error) {
        // Do something with request error
        console.log("axios request interceptor error", error);
        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.request.eject(reqInterceptor);
    };
  }, [me]);

  useEffect(() => {
    axios.defaults.baseURL = import.meta.env.VITE_BASE_API_URL;
    const resInterceptor = axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        console.log("axios response interceptor success");
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        console.log("axios response interceptor error", error);
        if (
          error &&
          error.response &&
          error.response.data &&
          error.response.data.reAuthRequired
        ) {
          window.history.pushState({}, "", "/login");
          window.location.reload();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(resInterceptor);
    };
  }, []);

  return <MeContext.Provider value={value}>{children}</MeContext.Provider>;
};

export default MeProvider;
