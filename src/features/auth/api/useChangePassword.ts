import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { axiosClient } from "@/api/axiosClient";
import { type ApiResponse } from "@/api/types";
import { type ChangePasswordInput } from "@/features/auth/validations/change-password-schema";

export const useChangePassword = () => {
  return useMutation({
    mutationFn: async (data: ChangePasswordInput) => {
      const response = await axiosClient.post<ApiResponse<void>>(
        "/auth/me/password",
        data,
      );
      return response.data;
    },
    onSuccess: (response) => {
      toast.success(response.message || "Đổi mật khẩu thành công");
    },
    onError: (error: AxiosError<ApiResponse<void>>) => {
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi đổi mật khẩu",
      );
    },
  });
};
