import { type ReactNode } from "react";

import { Flex } from "@/components/layout/flex/Flex";
import { colors } from "@/styles/colors";

/**
 * Cấu hình Props cho MainContentArea.
 */
export interface MainContentAreaProps {
  header?: ReactNode;
  children: ReactNode;
  contentStyle?: React.CSSProperties;
}

/**
 * Component Wrapper cho khu vực nội dung chính của ứng dụng.
 * Quản lý flexbox để nội dung chiếm toàn bộ không gian còn lại (bên dưới header/toolbar).
 * Đảm bảo scroll hoạt động đúng bên trong nội dung thay vì toàn trang.
 *
 * @example
 * ```tsx
 * <MainContentArea header={<DashboardHeader />}>
 *   <DashboardWidgets />
 * </MainContentArea>
 * ```
 */
export function MainContentArea({
  header,
  children,
  contentStyle,
}: MainContentAreaProps) {
  return (
    <Flex
      direction="column"
      style={{
        width: "100%",
        height: "100%",
        background: colors.backgroundCard,
      }}
    >
      {header}
      <div style={{ flex: 1, overflow: "hidden", ...contentStyle }}>
        {children}
      </div>
    </Flex>
  );
}
