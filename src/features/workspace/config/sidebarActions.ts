import { Plus, Trash2, FolderPlus } from "lucide-react";
import type { ActionConfig, SidebarNode } from "@/components/layout/sidebar";

export interface WorkspaceSidebarHandlers {
  onNewFolder: (workspaceId: string, parentFolderId?: string) => void;
  onDeleteWorkspace: (workspaceId: string, workspaceName: string) => void;
  onDeleteFolder: (folderId: string, folderName: string) => void;
  onNewRequest: (workspaceId: string, folderId?: string) => void;
  onDeleteRequest: (requestId: string, requestName: string) => void;
}

export const getWorkspaceActions = (
  workspaceId: string,
  workspaceName: string,
  handlers: WorkspaceSidebarHandlers,
): ActionConfig<SidebarNode>[] => [
  {
    label: "Tạo thư mục",
    icon: Plus,
    onClick: () => handlers.onNewFolder(workspaceId),
  },
  {
    label: "Tạo Request",
    icon: Plus,
    onClick: () => handlers.onNewRequest(workspaceId),
  },
  {
    label: "Xóa Workspace",
    icon: Trash2,
    variant: "danger",
    onClick: () => handlers.onDeleteWorkspace(workspaceId, workspaceName),
  },
];

export const getFolderActions = (
  workspaceId: string,
  folderId: string,
  folderName: string,
  currentDepth: number,
  handlers: WorkspaceSidebarHandlers,
): ActionConfig<SidebarNode>[] => [
  {
    label: "Tạo thư mục",
    icon: FolderPlus,
    hidden: currentDepth >= 2, // Limit depth to 3 levels (0, 1, 2)
    onClick: () => handlers.onNewFolder(workspaceId, folderId),
  },
  {
    label: "Tạo Request",
    icon: Plus,
    onClick: () => handlers.onNewRequest(workspaceId, folderId),
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
