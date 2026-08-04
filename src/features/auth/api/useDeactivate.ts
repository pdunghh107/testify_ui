import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { axiosClient } from "@/api/axiosClient";
import { type ApiResponse } from "@/api/types";
import { type DeactivateInput } from "@/features/auth/validations/deactivate-schema";
import { useAuthStore } from "@/store/authStore";

export const useDeactivate = () => {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationFn: async (data: DeactivateInput) => {
      const response = await axiosClient.post<ApiResponse<void>>(
        "/auth/me/deactivate",
        data,
      );
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Đã vô hiệu hóa tài khoản");
      logout();
      navigate({ to: "/login" });
    },
    onError: (error: AxiosError<ApiResponse<void>>) => {
      toast.error(
        error.response?.data?.message ||
          "Có lỗi xảy ra khi vô hiệu hóa tài khoản",
      );
    },
  });
};
