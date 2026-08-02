import { Plus, Trash2, FolderPlus } from "lucide-react";
import type { ActionConfig, SidebarNode } from "@/components/layout/sidebar";

export interface WorkspaceSidebarHandlers {
  onNewFolder: (projectId: string, parentFolderId?: string) => void;
  onDeleteProject: (projectId: string, projectName: string) => void;
  onDeleteFolder: (folderId: string, folderName: string) => void;
  onNewRequest: (projectId: string, folderId?: string) => void;
  onDeleteRequest: (requestId: string, requestName: string) => void;
}

export const getProjectActions = (
  projectId: string,
  projectName: string,
  handlers: WorkspaceSidebarHandlers,
): ActionConfig<SidebarNode>[] => [
  {
    label: "Tạo thư mục",
    icon: Plus,
    onClick: () => handlers.onNewFolder(projectId),
  },
  {
    label: "Tạo Request",
    icon: Plus,
    onClick: () => handlers.onNewRequest(projectId),
  },
  {
    label: "Xóa dự án",
    icon: Trash2,
    variant: "danger",
    onClick: () => handlers.onDeleteProject(projectId, projectName),
  },
];

export const getFolderActions = (
  projectId: string,
  folderId: string,
  folderName: string,
  currentDepth: number,
  handlers: WorkspaceSidebarHandlers,
): ActionConfig<SidebarNode>[] => [
  {
    label: "Tạo thư mục",
    icon: FolderPlus,
    hidden: currentDepth >= 2, // Limit depth to 3 levels (0, 1, 2)
    onClick: () => handlers.onNewFolder(projectId, folderId),
  },
  {
    label: "Tạo Request",
    icon: Plus,
    onClick: () => handlers.onNewRequest(projectId, folderId),
  },
  {
    label: "Xóa thư mục",
    icon: Trash2,
    variant: "danger",
    onClick: () => handlers.onDeleteFolder(folderId, folderName),
  },
];

export const getRequestActions = (
  requestId: string,
  requestName: string,
  handlers: WorkspaceSidebarHandlers,
): ActionConfig<SidebarNode>[] => [
  {
    label: "Xóa Request",
    icon: Trash2,
    variant: "danger",
    onClick: () => handlers.onDeleteRequest(requestId, requestName),
  },
];
