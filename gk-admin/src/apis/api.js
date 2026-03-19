import axios from "axios";

const API_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_URL,
});

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  console.log("📦 Processing Queue:", { error, token });

  failedQueue.forEach((prom) => {
    if (error) prom.reject(error);
    else prom.resolve(token);
  });

  failedQueue = [];
};


api.interceptors.request.use((config) => {
  let access = localStorage.getItem("access");

  console.log("📤 REQUEST:", config.url);
  console.log("🔐 ACCESS TOKEN:", access);

  if (!access || access === "null") {
    console.warn("⚠️ No valid access token found");
    return config;
  }

  config.headers.Authorization = `Bearer ${access}`;
  return config;
});


api.interceptors.response.use(
  (response) => {
    console.log(" RESPONSE SUCCESS:", response.config.url);
    return response;
  },

  async (error) => {
    const originalRequest = error.config;

    console.error(" ERROR:", error.response?.status, originalRequest?.url);

    if (error.response?.status === 401 && !originalRequest._retry) {
      console.warn("401 DETECTED → Trying refresh flow");

      originalRequest._retry = true;

      if (isRefreshing) {
        console.log(" Already refreshing → adding request to queue");

        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            console.log("Retrying request from queue with new token");

            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      isRefreshing = true;

      try {
        const refresh_token = localStorage.getItem("refresh");

        console.log("REFRESH TOKEN:", refresh_token);

        if (!refresh_token) {
          console.error("No refresh token available");
          throw new Error("No refresh token");
        }

        console.log("📡 Calling /auth/refresh API...");

        const res = await axios.post(`${API_URL}/auth/refresh`, {
          refresh_token: refresh_token,
        });

        console.log("✅ REFRESH RESPONSE:", res.data);

        const newAccess = res.data.access_token;

        if (!newAccess) {
          console.error("Invalid refresh response:", res.data);
          throw new Error("Invalid refresh response");
        }

        console.log("NEW ACCESS TOKEN:", newAccess);

        localStorage.setItem("access", newAccess);

        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccess}`;

        processQueue(null, newAccess);

        console.log("Retrying original request with new token");

        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return api(originalRequest);

      } catch (err) {
        console.error("REFRESH FAILED:", err);

        processQueue(err, null);

        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        console.warn("🚪 Redirecting to login...");
        window.location.replace("/login");

        return Promise.reject(err);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;