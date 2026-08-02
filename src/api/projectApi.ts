import { axiosClient } from "./axiosClient";

export interface Project {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}

export const getProjects = async (): Promise<Project[]> => {
  const { data } = await axiosClient.get("/projects");
  return data?.data || data;
};

export const createProject = async (payload: { name: string; description?: string }): Promise<Project> => {
  const { data } = await axiosClient.post("/projects", payload);
  return data?.data || data;
};

export const deleteProject = async (id: string): Promise<void> => {
  await axiosClient.delete(`/projects/${id}`);
};
