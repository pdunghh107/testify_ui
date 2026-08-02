import { axiosClient } from "./axiosClient";

export interface Folder {
  id: string;
  workspaceId: string;
  parentFolderId: string | null;
  name: string;
  depthLevel: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const getFolders = async (workspaceId: string): Promise<Folder[]> => {
  const { data } = await axiosClient.get(`/workspaces/${workspaceId}/folders`);
  return data?.data || data;
};

export const createFolder = async (
  workspaceId: string,
  payload: { name: string; parentFolderId?: string | null }
): Promise<Folder> => {
  const { data } = await axiosClient.post(`/workspaces/${workspaceId}/folders`, payload);
  return data?.data || data;
};

export const deleteFolder = async (workspaceId: string, folderId: string): Promise<void> => {
  await axiosClient.delete(`/workspaces/${workspaceId}/folders/${folderId}`);
};
