import axios from "axios";

export const serverUrl = "";

export const api = axios.create({
  baseURL: `${serverUrl}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const setAuthToken = (token?: { access: string; refresh: string }) => {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token.access}`;
    localStorage.setItem("access_token", token.access);
    localStorage.setItem("refresh_token", token.refresh);
  } else {
    delete api.defaults.headers.common["Authorization"];
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }
};

// use refresh token when access token expires
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.

      try {
        const refreshToken = localStorage.getItem("refreshToken");
        const response = await axios.post(`${serverUrl}/api/auth/refresh`, {
          refreshToken,
        });

        const { token } = response.data; //TODO: if it responses with refresh token aswell, then update the current refresh token
        setAuthToken(token);

        return api(originalRequest);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        setAuthToken();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export const joinName = (name: string | undefined) => {
  if (!name) {
    return;
  }

  const joinedName = name?.replace(/[^a-zA-Z0-9#]/g, "");

  return joinedName;
};
