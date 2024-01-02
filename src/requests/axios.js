import axios from "axios";

const instance = axios.create({
  baseURL: "https://have-a-dream.onrender.com/",
});

instance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      config.headers.ID = sessionStorage.getItem("ID");
    }

    return config;
  },
  (error) => {

    return Promise.reject(error);
  }
);

export default instance;
