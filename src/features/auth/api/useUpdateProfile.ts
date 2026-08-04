import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { axiosClient } from "@/api/axiosClient";
import { type ApiResponse } from "@/api/types";
import { type UpdateProfileInput } from "@/features/auth/validations/update-profile-schema";
import { type AuthUser, useAuthStore } from "@/store/authStore";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (data: UpdateProfileInput) => {
      const response = await axiosClient.put<ApiResponse<AuthUser>>(
        "/auth/me",
        data,
      );
      return response.data;
    },
    onSuccess: (response) => {
      // Update the global auth store with new user data
      setAuth(response.data);
      toast.success("Cập nhật hồ sơ thành công");
      // Invalidate if there is any 'me' query
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
    },
    onError: (error: AxiosError<ApiResponse<void>>) => {
      toast.error(
        error.response?.data?.message || "Có lỗi xảy ra khi cập nhật hồ sơ",
      );
    },
  });
};
