import { createFileRoute } from "@tanstack/react-router";

import { Flex } from "@/components/layout/flex";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

export const Route = createFileRoute(
  "/_layout/folders/$folderId",
)({
  component: FolderDashboard,
});

function FolderDashboard() {
  const { folderId } = Route.useParams();

  return (
    <Flex direction="column" gap={24} style={{ padding: "24px" }}>
      <h1 style={{ fontSize: fonts.size.xlarge, color: colors.textMain }}>
        Tổng quan Thư mục
      </h1>
      <p style={{ color: colors.textMuted }}>
        Folder ID: {folderId}
      </p>
      {/* Content for Folder Dashboard goes here */}
    </Flex>
  );
}
