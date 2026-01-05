import axios from "axios";

export const api = axios.create({
  baseURL: "http://10.0.2.2:3000", // Fixed for Android emulator access to local backend
  timeout: 8000,
});

api.interceptors.request.use((config) => {
  // @ts-ignore
  config.headers.Authorization = `Bearer ${globalThis.AUTH_TOKEN}`;
  return config;
});
