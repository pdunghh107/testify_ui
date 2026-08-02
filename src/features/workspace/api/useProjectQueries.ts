import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getProjects, createProject, deleteProject } from "@/api/projectApi";
import { getFolders, createFolder, deleteFolder } from "@/api/folderApi";

export const PROJECT_KEYS = {
  all: ["projects"] as const,
  folders: (projectId: string) => ["projects", projectId, "folders"] as const,
};

// --- PROJECTS ---

export const useProjects = () => {
  return useQuery({
    queryKey: PROJECT_KEYS.all,
    queryFn: getProjects,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.all });
    },
  });
};

// --- FOLDERS ---

export const useFolders = (projectId: string | null) => {
  return useQuery({
    queryKey: PROJECT_KEYS.folders(projectId!),
    queryFn: () => getFolders(projectId!),
    enabled: !!projectId,
  });
};

export const useCreateFolder = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: { name: string; parentFolderId?: string | null }) =>
      createFolder(projectId, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.folders(projectId) });
    },
  });
};

export const useDeleteFolder = (projectId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (folderId: string) => deleteFolder(projectId, folderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROJECT_KEYS.folders(projectId) });
    },
  });
};
