import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getWorkspaces, createWorkspace, deleteWorkspace } from "@/api/workspaceApi";
import { getFolders, createFolder, deleteFolder } from "@/api/folderApi";

export const WORKSPACE_KEYS = {
  all: ["workspaces"] as const,
  folders: (workspaceId: string) => ["workspaces", workspaceId, "folders"] as const,
};

// --- WORKSPACES ---

export const useWorkspaces = () => {
  return useQuery({
    queryKey: WORKSPACE_KEYS.all,
    queryFn: getWorkspaces,
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WORKSPACE_KEYS.all });
    },
  });
};

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteWorkspace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WORKSPACE_KEYS.all });
    },
  });
};

// --- FOLDERS ---

export const useFolders = (workspaceId: string | null) => {
  return useQuery({
    queryKey: WORKSPACE_KEYS.folders(workspaceId!),
    queryFn: () => getFolders(workspaceId!),
    enabled: !!workspaceId,
  });
};

export const useCreateFolder = (workspaceId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string; parentFolderId?: string | null }) =>
      createFolder(workspaceId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WORKSPACE_KEYS.folders(workspaceId) });
    },
  });
};

export const useDeleteFolder = (workspaceId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (folderId: string) => deleteFolder(workspaceId, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WORKSPACE_KEYS.folders(workspaceId) });
    },
  });
};
