import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    // Chưa đăng nhập mà muốn vào trang bảo mật -> đẩy ra /login
    if (!isAuthenticated && location.pathname !== "/login") {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    // Đã đăng nhập mà muốn vào /login -> đẩy ra Home
    if (isAuthenticated && location.pathname === "/login") {
      throw redirect({
        to: "/",
      });
    }
  },
  component: () => (
    <>
      <Outlet />
      <Toaster position="top-right" containerStyle={{ zIndex: 99999 }} />
    </>
  ),
});
