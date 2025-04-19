import axios from "axios";

export const serverUrl =
  import.meta.env.VITE_API_URL || "https://api.afkat.com/api/v1";

export const api = axios.create({
  baseURL: `${serverUrl}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
