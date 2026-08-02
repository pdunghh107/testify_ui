import { createContext, useContext } from "react";

export interface SidebarContextValue {
  collapsed: boolean;
  mobileOpen: boolean;
  onMobileClose?: () => void;
}

export const SidebarContext = createContext<SidebarContextValue | undefined>(undefined);

export const useSidebarContext = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a Sidebar.Root");
  }
  return context;
};
