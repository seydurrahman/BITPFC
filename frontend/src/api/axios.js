import axios from "axios";

const instance = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
});

// Attach JWT access token from localStorage when present
instance.interceptors.request.use((config) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore (e.g., SSR or private mode)
  }
  return config;
});

// Refresh access token on 401 using refresh token
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

        // Use a plain axios call to avoid interceptors recursion
        const resp = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
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
