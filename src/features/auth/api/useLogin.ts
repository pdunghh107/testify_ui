import { useMutation } from "@tanstack/react-query";
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

export const useCrmLogin = () => {
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
    },
  });
};
