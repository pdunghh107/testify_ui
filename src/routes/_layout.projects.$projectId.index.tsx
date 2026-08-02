import { createFileRoute } from "@tanstack/react-router";
import { Flex } from "@/components/layout/flex";
import { fonts } from "@/styles/fonts";
import { colors } from "@/styles/colors";

export const Route = createFileRoute("/_layout/projects/$projectId/")({
  component: ProjectDashboard,
});

function ProjectDashboard() {
  const { projectId } = Route.useParams();

  return (
    <Flex direction="column" gap={24} style={{ padding: "24px" }}>
      <h1 style={{ fontSize: fonts.size.xlarge, color: colors.textMain }}>
        Tổng quan Dự án
      </h1>
      <p style={{ color: colors.textMuted }}>Project ID: {projectId}</p>
      {/* Content for Project Dashboard goes here */}
    </Flex>
  );
}
