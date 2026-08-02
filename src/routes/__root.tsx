import { createRootRoute, Outlet, redirect } from "@tanstack/react-router";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "../store/authStore";

export const Route = createRootRoute({
  beforeLoad: ({ location }) => {
    const isAuthenticated = useAuthStore.getState().isAuthenticated;

    const publicRoutes = ["/login", "/register", "/forgot-password"];

    // Chưa đăng nhập mà muốn vào trang bảo mật -> đẩy ra /login
    if (!isAuthenticated && !publicRoutes.includes(location.pathname)) {
      throw redirect({
        to: "/login",
        search: {
          redirect: location.href,
        },
      });
    }

    // Đã đăng nhập mà muốn vào public routes -> đẩy ra Home
    if (isAuthenticated && publicRoutes.includes(location.pathname)) {
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
