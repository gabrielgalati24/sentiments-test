
import axios from "axios";
import Swal from "sweetalert2";
import { urls } from "./endpoints";

const SERVER_URL: string | undefined = import.meta.env.VITE_URL_BACKEND;

let tokenLocalStore: string | null = null;

if (typeof window !== "undefined") {
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.removeItem("token");
    location.href = urls.login;
  }
  if (token) {
    tokenLocalStore = token;
  }
}

const globalConfig = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: `Token ${tokenLocalStore}`,
};

export const service = axios.create({
  baseURL: SERVER_URL,
  headers: globalConfig,
});

service.interceptors.request.use(
  (config:any) => {
    if (localStorage.getItem("token")) {
      if (typeof window !== "undefined" && !!globalConfig) {
        const data = localStorage.getItem("token");

        if (data) {
          globalConfig.Authorization = `Token ${data}`;
        }
      }
    
      config.headers = globalConfig;
    }
    config.withCredentials = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = urls.login;
      console.error(Error(error.message ?? error));

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Tu sesión a expirado, será redirigido a la pantalla de inicio de sesión!",
      }).then(() => {
        localStorage.removeItem("token");
            window.location.href = urls.login;
        console.error(Error(error.message ?? error));
      });
    }
    switch (error.response?.status) {
      case 401:
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Tu sesión a expirado, será redirigido a la pantalla de inicio de sesión!",
        }).then(() => {
          localStorage.removeItem("token");
          window.location.href = urls.login;
          console.error(Error(error.message ?? error));
        });
        break;

      case 403:
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: `¡403 Forbidden Error! \n${
            error.response?.data?.detail || error
          }`,
        }).then(() => {
          console.error(Error(error.message ?? error));
        });
        break;

      default:
        Swal.fire({
          icon: "error",
          title: "Error...",
          text: `!Ocurrió un error! \n${error.response?.data?.detail || error}`,
        }).then(() => {
          console.error(Error(error.message ?? error));
        });
        break;
    }

    return Promise.reject(error);
  }
);
