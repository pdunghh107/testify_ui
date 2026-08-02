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
  useDeleteProject,
  useFolders,
  useProjects,
} from "@/features/workspace/api/useProjectQueries";
import { CreateFolderModal } from "@/features/workspace/components/modal/CreateFolderModal";
import { CreateProjectModal } from "@/features/workspace/components/modal/CreateProjectModal";
import { CreateRequestModal } from "@/features/workspace/components/modal/CreateRequestModal";
import { useConfirm } from "@/hooks/useConfirm";
import { useProjectStore } from "@/store/projectStore";

import {
  getFolderActions,
  getProjectActions,
  getRequestActions,
  type WorkspaceSidebarHandlers,
} from "../config/sidebarActions";

export const useWorkspaceTree = () => {
  // 1. Modals State
  const [isProjectModalOpen, setProjectModalOpen] = useState(false);

  const [folderModalState, setFolderModalState] = useState<{
    isOpen: boolean;
    projectId?: string;
    parentFolderId?: string;
  }>({ isOpen: false });

  const [requestModalState, setRequestModalState] = useState<{
    isOpen: boolean;
    projectId?: string;
    folderId?: string;
  }>({ isOpen: false });

  const confirm = useConfirm();

  // 2. Domain Data
  const { activeProjectId } = useProjectStore();
  const { data: projects = [] } = useProjects();
  const { data: activeProjectFolders = [] } = useFolders(
    activeProjectId || null,
  );
  const { data: activeProjectRequests = [] } = useRequests(
    activeProjectId || null,
  );

  // Mutations
  const deleteProject = useDeleteProject();
  const deleteFolder = useDeleteFolder(activeProjectId || "");
  const deleteRequest = useDeleteRequest(activeProjectId || "");

  // 3. Handlers for Factory
  const handlers: WorkspaceSidebarHandlers = useMemo(
    () => ({
      onNewFolder: (projectId, parentFolderId) => {
        setFolderModalState({ isOpen: true, projectId, parentFolderId });
      },
      onDeleteProject: (projectId, projectName) => {
        confirm({
          title: "Xóa Project",
          body: `Bạn có chắc chắn muốn xóa Project "${projectName}" không? Toàn bộ dữ liệu bên trong sẽ bị mất vĩnh viễn.`,
          type: "danger",
          action: async () => {
            await deleteProject.mutateAsync(projectId);
            toast.success("Xóa Project thành công");
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
      onNewRequest: (projectId, folderId) => {
        setRequestModalState({ isOpen: true, projectId, folderId });
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
      const childrenFolders = activeProjectFolders.filter(
        (f) => (f.parentFolderId || null) === parentFolderId,
      );

      const childrenRequests = activeProjectRequests.filter(
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
          projectId: projId,
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
          projectId: projId,
          requestId: req.id,
        },
      }));

      return [...folderNodes, ...requestNodes];
    };

    return projects.map((proj) => {
      const isProjectActive = activeProjectId === proj.id;

      return {
        id: proj.id,
        label: proj.name,
        actions: getProjectActions(proj.id, proj.name, handlers),
        children: isProjectActive ? buildFolderNodes(null, proj.id) : [],
        originalData: { type: "project", projectId: proj.id },
      };
    });
  }, [
    projects,
    activeProjectFolders,
    activeProjectRequests,
    handlers,
    activeProjectId,
  ]);

  // 5. Render Modals
  const WorkspaceModals = (
    <>
      <CreateProjectModal
        isOpen={isProjectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />

      {folderModalState.isOpen && folderModalState.projectId && (
        <CreateFolderModal
          isOpen={folderModalState.isOpen}
          onClose={() => setFolderModalState({ isOpen: false })}
          projectId={folderModalState.projectId}
          parentFolderId={folderModalState.parentFolderId}
        />
      )}

      {requestModalState.isOpen && requestModalState.projectId && (
        <CreateRequestModal
          isOpen={requestModalState.isOpen}
          onClose={() => setRequestModalState({ isOpen: false })}
          projectId={requestModalState.projectId}
          folderId={requestModalState.folderId}
        />
      )}
    </>
  );

  return {
    nodes,
    WorkspaceModals,
    onNewProject: () => setProjectModalOpen(true),
  };
};
