import axios from "axios";

const instance = axios.create({
  baseURL: "http://51.20.5.222:3000/",
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      console.log("token", token);
      config.headers.Authorization = `${token}`;
      //config.headers.ID = sessionStorage.getItem("ID");
    }
    console.log("config", config.headers);

    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);

export default instance;
