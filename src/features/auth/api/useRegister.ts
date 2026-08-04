import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { axiosClient } from "../../../api/axiosClient";
import { type ApiResponse } from "../../../api/types";
import { useAuthStore } from "../../../store/authStore";
import { setAccessToken } from "../../../utils/cookies";
import { type AuthResponse } from "./useLogin";

export interface RegisterCredentials {
  fullName: string;
  phone: string;
  email: string;
  password?: string;
  confirmPassword?: string;
  avatarUrl?: string;
}

export const useRegister = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (credentials: RegisterCredentials) => {
      const response = await axiosClient.post<ApiResponse<AuthResponse>>(
        "/auth/register",
        credentials,
      );
      return response.data;
    },
    onSuccess: (response) => {
      const { accessToken, user } = response.data;

      if (accessToken) setAccessToken(accessToken);

      setAuth(user);
      toast.success("Đăng ký thành công!");
      navigate({ to: "/" });
    },
    onError: (error: AxiosError<ApiResponse<void>>) => {
      toast.error(error.response?.data?.message || "Đăng ký thất bại");
    },
  });
};
