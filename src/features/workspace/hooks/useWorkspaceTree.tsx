import { FileJson, Folder as FolderIcon } from "lucide-react";
import { useMemo, useState } from "react";
import toast from "react-hot-toast";

import type { SidebarNode } from "@/components/layout/sidebar";
import {
  useDeleteRequest,
  useRequests,
} from "@/features/request/api/useRequestQueries";
import {
  useDeleteFolder,
  useDeleteWorkspace,
  useFolders,
} from "@/features/workspace/api/useWorkspaceQueries";
import { CreateFolderModal } from "@/features/workspace/components/modal/CreateFolderModal";
import { CreateWorkspaceModal } from "@/features/workspace/components/modal/CreateWorkspaceModal";
import { CreateRequestModal } from "@/features/workspace/components/modal/CreateRequestModal";
import { useConfirm } from "@/hooks/useConfirm";
import { useProjectStore } from "@/store/workspaceStore";

import {
  getFolderActions,
  getRequestActions,
  type WorkspaceSidebarHandlers,
} from "../config/sidebarActions";

export const useWorkspaceTree = () => {
  // 1. Modals State
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);

  const [folderModalState, setFolderModalState] = useState<{
    isOpen: boolean;
    workspaceId?: string;
    parentFolderId?: string;
  }>({ isOpen: false });

  const [requestModalState, setRequestModalState] = useState<{
    isOpen: boolean;
    workspaceId?: string;
    folderId?: string;
  }>({ isOpen: false });

  const confirm = useConfirm();

  // 2. Domain Data
  const { activeWorkspaceId } = useProjectStore();
  const { data: activeWorkspaceFolders = [] } = useFolders(
    activeWorkspaceId || null,
  );
  const { data: activeWorkspaceRequests = [] } = useRequests(
    activeWorkspaceId || null,
  );

  // Mutations
  const deleteProject = useDeleteWorkspace();
  const deleteFolder = useDeleteFolder(activeWorkspaceId || "");
  const deleteRequest = useDeleteRequest(activeWorkspaceId || "");

  // 3. Handlers for Factory
  const handlers: WorkspaceSidebarHandlers = useMemo(
    () => ({
      onNewFolder: (workspaceId, parentFolderId) => {
        setFolderModalState({ isOpen: true, workspaceId, parentFolderId });
      },
      onDeleteProject: (workspaceId, projectName) => {
        confirm({
          title: "Xóa Workspace",
          body: `Bạn có chắc chắn muốn xóa Workspace "${projectName}" không? Toàn bộ dữ liệu bên trong sẽ bị mất vĩnh viễn.`,
          type: "danger",
          action: async () => {
            await deleteProject.mutateAsync(workspaceId);
            toast.success("Xóa Workspace thành công");
          },
        });
      },
      onDeleteFolder: (folderId, folderName) => {
        confirm({
          title: "Xóa Thư Mục",
          body: `Bạn có chắc chắn muốn xóa thư mục "${folderName}" không?`,
          type: "danger",
          action: async () => {
            await deleteFolder.mutateAsync(folderId);
            toast.success("Xóa thư mục thành công");
          },
        });
      },
      onNewRequest: (workspaceId, folderId) => {
        setRequestModalState({ isOpen: true, workspaceId, folderId });
      },
      onDeleteRequest: (requestId, requestName) => {
        confirm({
          title: "Xóa Request",
          body: `Bạn có chắc chắn muốn xóa Request "${requestName}" không?`,
          type: "danger",
          action: async () => {
            await deleteRequest.mutateAsync(requestId);
          },
        });
      },
    }),
    [confirm, deleteProject, deleteFolder, deleteRequest],
  );

  // 4. Mapper
  const nodes: SidebarNode[] = useMemo(() => {
    const buildFolderNodes = (
      parentFolderId: string | null,
      projId: string,
      currentDepth: number = 0,
    ): SidebarNode[] => {
      const childrenFolders = activeWorkspaceFolders.filter(
        (f) => (f.parentFolderId || null) === parentFolderId,
      );

      const childrenRequests = activeWorkspaceRequests.filter(
        (r) => (r.folderId || null) === parentFolderId,
      );

      const folderNodes = childrenFolders.map((folder) => ({
        id: folder.id,
        label: folder.name,
        icon: FolderIcon,
        actions: getFolderActions(
          projId,
          folder.id,
          folder.name,
          currentDepth,
          handlers,
        ),
        children: buildFolderNodes(folder.id, projId, currentDepth + 1),
        originalData: {
          type: "folder",
          workspaceId: projId,
          folderId: folder.id,
        },
      }));

      const requestNodes = childrenRequests.map((req) => ({
        id: req.id,
        label: req.name,
        icon: FileJson,
        actions: getRequestActions(req.id, req.name, handlers),
        children: [],
        originalData: {
          type: "request",
          workspaceId: projId,
          requestId: req.id,
        },
      }));

      return [...folderNodes, ...requestNodes];
    };

    if (!activeWorkspaceId) return [];

    return buildFolderNodes(null, activeWorkspaceId);
  }, [activeWorkspaceFolders, activeWorkspaceRequests, handlers, activeWorkspaceId]);

  // 5. Render Modals
  const WorkspaceModals = (
    <>
      <CreateWorkspaceModal
        isOpen={isProjectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />

      {folderModalState.isOpen && folderModalState.workspaceId && (
        <CreateFolderModal
          isOpen={folderModalState.isOpen}
          onClose={() => setFolderModalState({ isOpen: false })}
          workspaceId={folderModalState.workspaceId}
          parentFolderId={folderModalState.parentFolderId}
        />
      )}

      {requestModalState.isOpen && requestModalState.workspaceId && (
        <CreateRequestModal
          isOpen={requestModalState.isOpen}
          onClose={() => setRequestModalState({ isOpen: false })}
          workspaceId={requestModalState.workspaceId}
          folderId={requestModalState.folderId}
        />
      )}
    </>
  );

  return {
    nodes,
    WorkspaceModals,
    onNewProject: () => setProjectModalOpen(true),
    onNewFolder: () => {
      if (activeWorkspaceId) {
        setFolderModalState({ isOpen: true, workspaceId: activeWorkspaceId });
      }
    },
  };
};
