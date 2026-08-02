import { axiosClient } from "./axiosClient";

export interface Folder {
  id: string;
  projectId: string;
  parentFolderId: string | null;
  name: string;
  depthLevel: number;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const getFolders = async (projectId: string): Promise<Folder[]> => {
  const { data } = await axiosClient.get(`/projects/${projectId}/folders`);
  return data?.data || data;
};

export const createFolder = async (
  projectId: string,
  payload: { name: string; parentFolderId?: string | null }
): Promise<Folder> => {
  const { data } = await axiosClient.post(`/projects/${projectId}/folders`, payload);
  return data?.data || data;
};

export const deleteFolder = async (projectId: string, folderId: string): Promise<void> => {
  await axiosClient.delete(`/projects/${projectId}/folders/${folderId}`);
};
