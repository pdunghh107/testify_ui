import { useEffect, useState } from "react";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import styled from "styled-components";
import { AppSidebar } from "../features/global/components/sidebar/AppSidebar";
import { Header } from "../components/layout/header/Header";
import { Flex } from "../components/layout/flex";
import { colors } from "../styles/colors";
import { useGetMeQuery } from "../features/auth/api/useProfile";
import { useAuthStore } from "../store/authStore";

export const Route = createFileRoute("/_layout")({
  component: MainLayout,
});

const LayoutContainer = styled(Flex)`
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  background-color: ${colors.backgroundApp};
`;

const ContentContainer = styled(Flex)`
  flex: 1;
  overflow: hidden;
`;

const MainArea = styled.main`
  flex: 1;
  overflow-y: auto;
  // padding: 24px;
`;

function MainLayout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Gọi API lấy Profile mới nhất (vd: permissions bị đổi từ Admin)
  const { data: profileResponse } = useGetMeQuery();
  const setAuth = useAuthStore((state) => state.setAuth);

  useEffect(() => {
    if (profileResponse?.data) {
      setAuth(profileResponse.data);
    }
  }, [profileResponse, setAuth]);

  return (
    <LayoutContainer>
      {/* ─── SIDEBAR ─── */}
      <AppSidebar
        collapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        mobileOpen={mobileSidebarOpen}
        onMobileClose={() => setMobileSidebarOpen(false)}
      />

      {/* ─── MAIN CONTENT AREA ─── */}
      <ContentContainer direction="column">
        {/* HEADER */}
        <Header
          onToggleSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)}
        />

        {/* CONTENT */}
        <MainArea>
          <Outlet />
        </MainArea>
      </ContentContainer>
    </LayoutContainer>
  );
}
