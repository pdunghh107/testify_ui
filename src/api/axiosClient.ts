import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "../config/env";
import {
  getAccessToken,
  setAccessToken,
} from "../utils/cookies";
import { useAuthStore } from "../store/authStore";

// ─── Khởi tạo Axios Instance ───
export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// ─── Request Interceptor ───
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 1. Đính kèm Access Token
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Quản lý Refresh Token Queue (Locking) ───
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: any) => void;
}> = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// ─── Response Interceptor ───
axiosClient.interceptors.response.use(
  (response) => {
    // Trả về data bên trong axios response
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Bỏ qua nếu lỗi không phải 401, hoặc request đó là request gọi refresh token (chống lặp vô hạn)
    if (
      !error.response ||
      error.response.status !== 401 ||
      originalRequest.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    if (originalRequest && !originalRequest._retry) {
      if (isRefreshing) {
        // Đang refresh -> Đưa request này vào Queue (Locking)
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosClient(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      // Chưa refresh -> Bắt đầu quá trình refresh
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const refreshUrl = `${API_BASE_URL}/auth/refresh`;

        // Gọi axios với withCredentials = true để trình duyệt gửi cookie
        const res = await axios.post(
          refreshUrl,
          {},
          { withCredentials: true }
        );

        const { accessToken } = res.data?.data || res.data;

        if (accessToken) {
          setAccessToken(accessToken);

          axiosClient.defaults.headers.common["Authorization"] =
            `Bearer ${accessToken}`;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;

          processQueue(null, accessToken);
          return axiosClient(originalRequest);
        } else {
          throw new Error("No token returned");
        }
      } catch (refreshError) {
        processQueue(refreshError, null);
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  },
);
