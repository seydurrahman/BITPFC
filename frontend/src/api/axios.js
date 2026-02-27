import axios from "axios";

const DEFAULT_API = "http://127.0.0.1:8000/api";
const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || DEFAULT_API, // dynamic based on env, fallback for local dev
});

// Debug: expose base URL in console to help troubleshoot media/image resolving
// eslint-disable-next-line no-console
console.debug("API baseURL:", instance.defaults.baseURL);

// JWT token handling (same as before)
instance.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {}
  return config;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refresh = localStorage.getItem("refreshToken");
        if (!refresh) throw new Error("No refresh token");

        const resp = await axios.post(
          `${import.meta.env.VITE_API_URL}/token/refresh/`,
          { refresh },
        );
        const { access } = resp.data || {};
        if (access) {
          localStorage.setItem("accessToken", access);
          originalRequest.headers = originalRequest.headers || {};
          originalRequest.headers.Authorization = `Bearer ${access}`;
          return instance(originalRequest);
        }
      } catch (e) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  },
);

export default instance;
