import api from "../config/axios.config";

export const setAuthToken = (token?: { access: string; refresh: string }) => {
  if (token?.access && token?.refresh) {
    localStorage.setItem("access_token", token.access);
    localStorage.setItem("refresh_token", token.refresh);

    api.defaults.headers.common["Authorization"] = `Bearer ${token.access}`;
  } else {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    delete api.defaults.headers.common["Authorization"];
  }
};

const localAccessToken = localStorage.getItem("access_token");
const localRefreshToken = localStorage.getItem("refresh_token");
if (localAccessToken && localRefreshToken) {
  setAuthToken({
    access: localAccessToken,
    refresh: localRefreshToken,
  });
}

export const isAuthenticated = () => {
  return !!(
    localStorage.getItem("access_token") &&
    localStorage.getItem("refresh_token")
  );
};

// Add the interceptor to the api instance (use refresh token when access token expires)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark the request as retried to avoid infinite loops.

      try {
        const refreshToken = localStorage.getItem("refresh_token");

        if (!refreshToken) {
          console.error("No refresh token available");
          setAuthToken();
          return Promise.reject(error);
        }

        const response = await api.post(`/auth/token/refresh/`, {
          refresh: refreshToken,
        });

        if (response.data?.access) {
          const newToken = {
            access: response.data.access,
            refresh: refreshToken,
          };

          setAuthToken(newToken);
          console.log("Token refreshed successfully");

          originalRequest.headers["Authorization"] =
            `Bearer ${newToken.access}`;

          return api(originalRequest);
        } else {
          console.error("Refresh response missing access token");
          setAuthToken();
          return Promise.reject(error);
        }
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

export const defaultImage = (username: string) => {
  return username ? username.charAt(0).toUpperCase() : null;
};
