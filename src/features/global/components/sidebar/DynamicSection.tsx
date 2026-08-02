import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { Sidebar, type SidebarNode } from "@/components/layout/sidebar";
import { useWorkspaceTree } from "@/features/workspace/hooks/useWorkspaceTree";
import { useProjectStore } from "@/store/projectStore";

export const DynamicSection = () => {
  const { nodes, WorkspaceModals, onNewProject } = useWorkspaceTree();

  const { activeProjectId, setActiveProject, activeFolderId, setActiveFolder } =
    useProjectStore();
  const activeNodeId = activeFolderId || activeProjectId || null;
  const navigate = useNavigate();

  const handleNodeSelect = (id: string, node: SidebarNode) => {
    if (node.originalData?.type === "project") {
      setActiveProject(id);
      navigate({
        to: "/projects/$projectId",
        params: { projectId: id },
      });
    } else if (node.originalData?.type === "folder") {
      setActiveFolder(id);
      navigate({
        to: "/folders/$folderId",
        params: {
          folderId: node.originalData?.folderId,
        },
      });
    } else if (node.originalData?.type === "request") {
      navigate({
        to: "/requests/$requestId",
        params: {
          requestId: node.originalData?.requestId,
        },
      });
    }
  };

  return (
    <>
      <Sidebar.Group isFirst>
        <Sidebar.GroupLabel
          action={
            <Sidebar.Action
              onClick={onNewProject}
              icon={<Plus size={16} />}
              aria-label="Tạo dự án"
            />
          }
        >
          Dự án của bạn
        </Sidebar.GroupLabel>

        <Sidebar.Tree
          data={nodes}
          activeId={activeNodeId}
          onNodeSelect={handleNodeSelect}
        />
      </Sidebar.Group>
      {WorkspaceModals}
    </>
  );
};
