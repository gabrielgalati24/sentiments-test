import axios, { AxiosResponse } from "axios";
// import Router from "next/router";

import Swal from "sweetalert2";
import { endpoints } from "./endpoints";
import { notifications } from '@mantine/notifications';

const login = async (values: unknown) : Promise<any> => {
  const url = import.meta.env.VITE_URL_BACKEND  || + endpoints.login;

  return axios
    .post(url, values)
    .then((res: AxiosResponse<any>) => {
      localStorage.setItem("token", res.data.token);
        return res;
  
    })
    .catch((err: any) => {
      console.error(Error(err));

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Error message: ${err}`,
      });
    });
};

const register = async (values: unknown) : Promise<any> => {
  const url = import.meta.env.VITE_URL_BACKEND  + endpoints.register;

  return axios
    .post(url, values)
    .then((res: AxiosResponse<unknown>) => {
      console.log(res);
      notifications.show({
        title: 'Register success!',
        message: `Welcome to the app!`,
      })
      return res;
     
    })
    .catch((err: any) => {
      console.error(Error(err));
        Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `Error message: ${err}`,
        })
  
    });
}

const logout = async () => {
  Swal.fire({
    title: "Logout",
    text: "Are you sure you want to logout?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, logout!",
  }).then((result) => {
    if (result.isConfirmed) {
      localStorage.removeItem("token");
      window.location.href = "/login";
 
    
    }
  });
};

export { login, logout, register };

