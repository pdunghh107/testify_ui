import { type ReactNode } from "react";

import { Flex } from "@/components/layout/flex/Flex";
import { colors } from "@/styles/colors";

interface MainContentAreaProps {
  header?: ReactNode;
  children: ReactNode;
  contentStyle?: React.CSSProperties;
}

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
