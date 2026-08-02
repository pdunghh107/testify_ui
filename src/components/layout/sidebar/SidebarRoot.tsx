import { type ReactNode } from "react";
import styled from "styled-components";

import { colors } from "@/styles/colors";

import { SidebarContext } from "./SidebarContext";

export interface SidebarRootProps {
  children: ReactNode;
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

interface SidebarStyleProps {
  $collapsed: boolean;
  $mobileOpen: boolean;
}

export const SidebarRoot = ({
  children,
  collapsed,
  mobileOpen,
  onMobileClose,
}: SidebarRootProps) => {
  return (
    <SidebarContext.Provider value={{ collapsed, mobileOpen, onMobileClose }}>
      <SidebarOverlay $visible={mobileOpen} onClick={onMobileClose} />
      <SidebarWrapper $collapsed={collapsed} $mobileOpen={mobileOpen}>
        {children}
      </SidebarWrapper>
    </SidebarContext.Provider>
  );
};

const SidebarWrapper = styled.aside<SidebarStyleProps>`
  width: ${({ $collapsed }) => ($collapsed ? "80px" : "200px")};
  height: 100vh;
  background: ${colors.sidebar.bg};
  display: flex;
  flex-direction: column;
  transition:
    width 0.25s ease,
    transform 0.28s ease;
  flex-shrink: 0;
  position: relative;
  z-index: 50;
  border-right: 1px solid rgba(255, 255, 255, 0.05);

  @media (max-width: 1024px) {
    position: fixed;
    z-index: 200;
    transform: ${({ $mobileOpen }) =>
      $mobileOpen ? "translateX(0)" : "translateX(-100%)"};
  }
`;

const SidebarOverlay = styled.div<{ $visible: boolean }>`
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.55);
  backdrop-filter: blur(3px);
  z-index: 150;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? "auto" : "none")};
  transition: opacity 0.3s ease;

  @media (max-width: 1024px) {
    display: block;
  }
`;
