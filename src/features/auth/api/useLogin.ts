import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import type { AxiosError } from "axios";
import { toast } from "react-hot-toast";

import { axiosClient } from "../../../api/axiosClient";
import { type ApiResponse } from "../../../api/types";
import { type AuthUser, useAuthStore } from "../../../store/authStore";
import { setAccessToken } from "../../../utils/cookies";

export interface LoginCredentials {
  email: string;
  password?: string;
  identifier?: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: AuthUser;
}

export const useLogin = () => {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await axiosClient.post<ApiResponse<AuthResponse>>(
        "/auth/login",
        credentials,
      );
      return response.data;
    },
    onSuccess: (response) => {
      const { accessToken, user } = response.data;

      if (accessToken) setAccessToken(accessToken);

      setAuth(user);
      toast.success("Đăng nhập thành công!");
      navigate({ to: "/" });
    },
    onError: (error: AxiosError<ApiResponse<void>>) => {
      toast.error(error.response?.data?.message || "Đăng nhập thất bại");
    },
  });
};
