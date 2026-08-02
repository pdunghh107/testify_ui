import { axiosClient } from "../../../api/axiosClient";

export interface ApiConfigData {
  id: string;
  name: string;
  baseUrl: string;
  config: Record<string, any> | null;
  createdAt: string;
  updatedAt: string;
}

export interface ApiConfigPayload {
  name: string;
  baseUrl: string;
  config: Record<string, any> | null;
}

export const configApi = {
  getAll: () => axiosClient.get("/configs").then(res => res.data?.data ?? res.data),
  getById: (id: string) => axiosClient.get(`/configs/${id}`).then(res => res.data?.data ?? res.data),
  create: (data: ApiConfigPayload) => axiosClient.post("/configs", data).then(res => res.data?.data ?? res.data),
  update: (id: string, data: ApiConfigPayload) => axiosClient.put(`/configs/${id}`, data).then(res => res.data?.data ?? res.data),
  delete: (id: string) => axiosClient.delete(`/configs/${id}`).then(res => res.data?.data ?? res.data),
};
