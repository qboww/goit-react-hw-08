import axios from "axios";

const backendApi = axios.create({
  baseURL: "http://localhost:5000/",
});

export default backendApi;

export const setToken = (token) => {
  backendApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  backendApi.defaults.headers.common.Authorization = "";
};
