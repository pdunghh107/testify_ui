import { useNavigate } from "@tanstack/react-router";
import { Plus } from "lucide-react";

import { Sidebar, type SidebarNode } from "@/components/layout/sidebar";
import { useWorkspaceTree } from "@/features/workspace/hooks/useWorkspaceTree";
import { useProjectStore } from "@/store/workspaceStore";

export const DynamicSection = () => {
  const { nodes, WorkspaceModals, onNewFolder } = useWorkspaceTree();

  const { activeWorkspaceId, setActiveWorkspace, activeFolderId, setActiveFolder } =
    useProjectStore();
  const activeNodeId = activeFolderId || activeWorkspaceId || null;
  const navigate = useNavigate();

  const handleNodeSelect = (id: string, node: SidebarNode) => {
    if (node.originalData?.type === "workspace") {
      setActiveWorkspace(id);
      navigate({
        to: "/workspaces/$workspaceId",
        params: { workspaceId: id },
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
            activeWorkspaceId ? (
              <Sidebar.Action
                onClick={onNewFolder}
                icon={<Plus size={16} />}
                aria-label="Tạo thư mục"
              />
            ) : undefined
          }
        >
          Thư mục
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
