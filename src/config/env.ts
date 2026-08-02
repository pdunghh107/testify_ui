// Cấu hình Base URL chung cho API (dùng cho Axios)
// Trỏ tới Vite proxy (hoặc backend url trực tiếp)
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api/v1";
