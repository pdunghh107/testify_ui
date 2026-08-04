import { axiosClient } from "./axiosClient";

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const getWorkspaces = async (): Promise<Workspace[]> => {
  const { data } = await axiosClient.get("/workspaces");
  return data?.data || data;
};

export const createWorkspace = async (payload: { name: string; description?: string }): Promise<Workspace> => {
  const { data } = await axiosClient.post("/workspaces", payload);
  return data?.data || data;
};

export const deleteWorkspace = async (id: string): Promise<void> => {
  await axiosClient.delete(`/workspaces/${id}`);
};
