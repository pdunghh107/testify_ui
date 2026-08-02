import { createFileRoute } from "@tanstack/react-router";

import { Flex } from "@/components/layout/flex";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

export const Route = createFileRoute("/_layout/")({
  component: WelcomePage,
});

function WelcomePage() {
  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      style={{ height: "100%", textAlign: "center" }}
      gap={16}
    >
      <h1
        style={{
          fontSize: fonts.size.xxlarge,
          color: colors.textMain,
          fontWeight: 600,
        }}
      >
        Chào mừng đến với Testify
      </h1>
      <p style={{ color: colors.textMuted, fontSize: fonts.size.base }}>
        Vui lòng chọn một Request từ thanh Sidebar để bắt đầu hoặc tạo mới một
        Request.
      </p>
    </Flex>
  );
}
