import { axiosClient } from "./axiosClient";

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const getProjects = async (): Promise<Workspace[]> => {
  const { data } = await axiosClient.get("/workspaces");
  return data?.data || data;
};

export const createProject = async (payload: { name: string; description?: string }): Promise<Workspace> => {
  const { data } = await axiosClient.post("/workspaces", payload);
  return data?.data || data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await axiosClient.delete(`/workspaces/${id}`);
};
