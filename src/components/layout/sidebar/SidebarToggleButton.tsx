import { ChevronLeft, ChevronRight } from "lucide-react";
import { useSidebarContext } from "./SidebarContext";
import styled from "styled-components";
import { colors } from "@/styles/colors";

/**
 * Nút bật/tắt (mở rộng/thu gọn) Sidebar. Nằm ngay cạnh viền phải của Sidebar.
 * Tự động ẩn trên màn hình mobile.
 *
 * @example
 * ```tsx
 * <SidebarToggleButton onClick={() => setCollapsed(!collapsed)} />
 * ```
 */
export const SidebarToggleButton = ({ onClick }: { onClick?: () => void }) => {
  const { collapsed } = useSidebarContext();
  return (
    <ToggleButton onClick={onClick} aria-label="Toggle Sidebar">
      {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
    </ToggleButton>
  );
};

const ToggleButton = styled.button`
  position: absolute;
  left: 100%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 24px;
  height: 24px;
  background: ${colors.backgroundCard};
  border: 1px solid ${colors.borderLight};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 100;
  color: ${colors.textMuted};

  @media (max-width: 1024px) {
    display: none;
  }
`;
