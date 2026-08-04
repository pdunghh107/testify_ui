import { type ReactNode } from "react";
import styled from "styled-components";
import { Flex } from "../flex";

/**
 * Khu vực trên cùng của Sidebar, thường dùng để chứa Logo hoặc tên ứng dụng.
 * Có chiều cao cố định và viền phân cách với phần nội dung.
 *
 * @example
 * ```tsx
 * <SidebarHeader>
 *   <img src="/logo.svg" alt="Logo" />
 * </SidebarHeader>
 * ```
 */
export const SidebarHeader = ({ children }: { children: ReactNode }) => {
  return <IconWrapper align="center">{children}</IconWrapper>;
};

const IconWrapper = styled(Flex)`
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;
