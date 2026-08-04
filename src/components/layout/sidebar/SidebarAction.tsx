import styled from "styled-components";
import { IconButton } from "@/components/common/button/Button";
import { colors } from "@/styles/colors";

/**
 * Nút hành động nhỏ (IconButton) thường nằm bên phải của SidebarItem (ví dụ: nút dấu ba chấm, nút thêm mới).
 *
 * @example
 * ```tsx
 * <SidebarAction icon={<MoreHorizontal size={14} />} aria-label="Hành động" />
 * ```
 */
export const SidebarAction = styled(IconButton).attrs({
  variant: "ghost",
})`
  color: ${colors.textInverse} !important;
  opacity: 0.7;
  transition: opacity 0.2s;
  padding: 0;

  &:hover:not(:disabled) {
    background: transparent !important;
    opacity: 1;
  }
`;
