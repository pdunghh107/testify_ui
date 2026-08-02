import { axiosClient } from "../../../api/axiosClient";

export interface RuleConfig {
  id?: string;
  configCode: string;
  name: string;
  rules: Record<string, any>;
  createdAt?: string;
  updatedAt?: string;
}

export const ruleConfigApi = {
  getAll: async (): Promise<RuleConfig[]> => {
    const res = await axiosClient.get("/rule-configs");
    return res.data?.data ?? res.data ?? [];
  },

  getByCode: async (code: string): Promise<RuleConfig> => {
    const res = await axiosClient.get(`/rule-configs/code/${code}`);
    return res.data?.data ?? res.data;
  },

  create: async (data: RuleConfig): Promise<RuleConfig> => {
    const res = await axiosClient.post("/rule-configs", data);
    return res.data?.data ?? res.data;
  },

  update: async (id: string, data: RuleConfig): Promise<RuleConfig> => {
    const res = await axiosClient.put(`/rule-configs/${id}`, data);
    return res.data?.data ?? res.data;
  },

  delete: async (id: string): Promise<void> => {
    await axiosClient.delete(`/rule-configs/${id}`);
  },
};
