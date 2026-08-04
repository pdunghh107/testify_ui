import { createFileRoute } from "@tanstack/react-router";
import { Flex } from "@/components/layout/flex";
import { fonts } from "@/styles/fonts";
import { colors } from "@/styles/colors";

export const Route = createFileRoute("/_layout/workspaces/$workspaceId/")({
  component: WorkspaceDashboard,
});

function WorkspaceDashboard() {
  const { workspaceId } = Route.useParams();

  return (
    <Flex direction="column" gap={24} style={{ padding: "24px" }}>
      <h1 style={{ fontSize: fonts.size.xlarge, color: colors.textMain }}>
        Tổng quan Workspace
      </h1>
      <p style={{ color: colors.textMuted }}>Workspace ID: {workspaceId}</p>
      {/* Content for Workspace Dashboard goes here */}
    </Flex>
  );
}
