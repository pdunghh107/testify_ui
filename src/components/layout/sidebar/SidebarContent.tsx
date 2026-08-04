import { type ReactNode } from "react";
import styled from "styled-components";
import { Flex } from "../flex";

/**
 * Khu vực nội dung chính của Sidebar, thường chứa các mục điều hướng (SidebarItem, SidebarGroup).
 * Hỗ trợ cuộn (scroll) tự động nếu nội dung quá dài.
 *
 * @example
 * ```tsx
 * <SidebarContent>
 *   <SidebarItem icon={Home} label="Trang chủ" />
 * </SidebarContent>
 * ```
 */
export const SidebarContent = ({ children }: { children: ReactNode }) => {
  return (
    <NavScrollContainer direction="column" flex={1}>
      {children}
    </NavScrollContainer>
  );
};

const NavScrollContainer = styled(Flex)`
  overflow-y: auto;
  padding: 16px 0;
  overflow-x: hidden;
`;
