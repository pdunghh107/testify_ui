import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";

import { axiosClient } from "../../../api/axiosClient";
import { useAuthStore } from "../../../store/authStore";

export const useLogout = () => {
  const logoutLocal = useAuthStore((state) => state.logout);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // API Backend yêu cầu truyền Access Token (Axios interceptor đã tự đính kèm Bearer token)
      const response = await axiosClient.post("/auth/logout");
      return response.data;
    },
    onSuccess: () => {
      // Xóa state và cookie cục bộ
      logoutLocal();
      navigate({ to: "/login" });
    },
    onError: () => {
      // Dù API có lỗi (vd session đã hết hạn sẵn) thì vẫn cứ xóa local state để văng ra màn hình login
      logoutLocal();
      navigate({ to: "/login" });
    },
  });
};
