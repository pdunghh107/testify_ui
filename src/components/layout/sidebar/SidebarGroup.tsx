import { type ReactNode } from "react";
import { Flex } from "@/components/layout/flex/Flex";
import { useSidebarContext } from "./SidebarContext";
import styled from "styled-components";
import { fonts } from "@/styles/fonts";
import { colors } from "@/styles/colors";

/**
 * Cấu hình Props cho SidebarGroup.
 */
export interface SidebarGroupProps {
  children: ReactNode;
  isFirst?: boolean;
}

/**
 * Bao bọc một nhóm các mục điều hướng (SidebarItem) để tạo khoảng cách (margin) phù hợp.
 * Thường đi kèm với `SidebarGroupLabel` để hiển thị tiêu đề nhóm.
 *
 * @example
 * ```tsx
 * <SidebarGroup>
 *   <SidebarGroupLabel>Quản lý</SidebarGroupLabel>
 *   <SidebarItem icon={Settings} label="Cài đặt" />
 * </SidebarGroup>
 * ```
 */
export const SidebarGroup = ({ children, isFirst }: SidebarGroupProps) => {
  return <NavGroupWrapper $isFirst={isFirst}>{children}</NavGroupWrapper>;
};

const NavGroupWrapper = styled.div<{ $isFirst?: boolean }>`
  margin-top: ${({ $isFirst }) => ($isFirst ? "0" : "24px")};
`;

/**
 * Tiêu đề của một nhóm điều hướng trong Sidebar.
 * Tự động bị ẩn đi khi Sidebar ở trạng thái thu gọn (collapsed).
 *
 * @example
 * ```tsx
 * <SidebarGroupLabel action={<PlusIcon />}>Dự án</SidebarGroupLabel>
 * ```
 */
export const SidebarGroupLabel = ({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) => {
  const { collapsed } = useSidebarContext();
  if (collapsed) return null;

  return (
    <Flex
      align="center"
      justify="space-between"
      style={{ paddingRight: "16px" }}
    >
      <SectionTitle>{children}</SectionTitle>
      {action && <div style={{ marginTop: "-12px" }}>{action}</div>}
    </Flex>
  );
};

const SectionTitle = styled.div`
  padding: 0 16px 8px;
  font-size: ${fonts.size.small};
  font-weight: ${fonts.weight.semibold};
  color: ${colors.sidebar.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
`;
