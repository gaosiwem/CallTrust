import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.11.193:3000",
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  // @ts-ignore
  config.headers.Authorization = `Bearer ${globalThis.AUTH_TOKEN}`;
  return config;
});
