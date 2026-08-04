import { useQuery } from "@tanstack/react-query";

import { axiosClient } from "../../../api/axiosClient";
import { type ApiResponse } from "../../../api/types";
import { type AuthUser } from "../../../store/authStore";

export const AUTH_QUERY_KEYS = {
  PROFILE: ["auth", "profile"],
};

/**
 * Lấy thông tin cá nhân (Profile)
 */
export const useGetMeQuery = () => {
  return useQuery({
    queryKey: AUTH_QUERY_KEYS.PROFILE,
    queryFn: async () => {
      const response = await axiosClient.get<ApiResponse<AuthUser>>("/auth/me");
      return response.data;
    },
    // Tránh việc tự động fetch lại quá nhiều lần (vì auth profile thường không thay đổi nhanh)
    staleTime: 5 * 60 * 1000,
    retry: 1,
  });
};
