import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, createProject, deleteProject } from "@/api/workspaceApi";
import { getFolders, createFolder, deleteFolder } from "@/api/folderApi";

export const PROJECT_KEYS = {
  all: ["workspaces"] as const,
  folders: (workspaceId: string) => ["workspaces", workspaceId, "folders"] as const,
};

// --- WORKSPACES ---

export const useWorkspaces = () => {
  return useQuery({
    queryKey: PROJECT_KEYS.all,
    queryFn: getProjects,
  });
};

export const useCreateWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all });
    },
  });
};

export const useDeleteWorkspace = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all });
    },
  });
};

// --- FOLDERS ---

export const useFolders = (workspaceId: string | null) => {
  return useQuery({
    queryKey: PROJECT_KEYS.folders(workspaceId!),
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
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.folders(workspaceId) });
    },
  });
};

export const useDeleteFolder = (workspaceId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (folderId: string) => deleteFolder(workspaceId, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.folders(workspaceId) });
    },
  });
};
