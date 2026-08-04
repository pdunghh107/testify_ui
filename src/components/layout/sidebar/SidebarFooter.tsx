import { type ReactNode } from "react";

import { Flex } from "@/components/layout/flex/Flex";

/**
 * Khu vực dưới cùng của Sidebar, thường dùng cho các nút cài đặt, thông tin phiên bản hoặc nút thu gọn.
 *
 * @example
 * ```tsx
 * <SidebarFooter>
 *   <SidebarToggleButton />
 * </SidebarFooter>
 * ```
 */
export const SidebarFooter = ({ children }: { children: ReactNode }) => {
  return (
    <Flex
      style={{
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
        padding: "12px 0",
      }}
    >
      {children}
    </Flex>
  );
};
