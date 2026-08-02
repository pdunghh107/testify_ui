import { Sidebar } from "@/components/layout/sidebar";
import { useLogout } from "@/features/auth/api/useLogout";

import { DynamicSection } from "./DynamicSection";
import { LogoutSection } from "./LogoutSection";
import { StaticSection } from "./StaticSection";

export const AppSidebar = ({
  collapsed,
  mobileOpen,
  onToggle,
  onMobileClose,
}: {
  collapsed: boolean;
  mobileOpen: boolean;
  onToggle: () => void;
  onMobileClose: () => void;
}) => {
  const { mutate: logoutApi } = useLogout();
  const handleLogout = () => {
    logoutApi();
    onMobileClose();
  };

  return (
    <Sidebar.Root
      collapsed={collapsed}
      mobileOpen={mobileOpen}
      onMobileClose={onMobileClose}
    >
      <Sidebar.Header>
        <img
          src={collapsed ? "/logo-icon.png" : "/logo-full.png"}
          alt="CRM Logo"
          height={32}
          style={{ objectFit: "contain" }}
        />
      </Sidebar.Header>

      <Sidebar.Content>
        <DynamicSection />
        <StaticSection />
      </Sidebar.Content>

      <Sidebar.ToggleButton onClick={onToggle} />

      <LogoutSection onClick={handleLogout} />
    </Sidebar.Root>
  );
};
