import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { axiosClient } from "@/api/axiosClient";

// Types
export interface RequestResponse {
  id: string;
  projectId: string;
  folderId?: string;
  name: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  bodyTemplate: string;
  defaultRuleId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateRequestPayload {
  projectId: string;
  folderId?: string;
  name: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  bodyTemplate: string;
  defaultRuleId?: string;
}

// Queries
export const useRequests = (projectId: string | null) => {
  return useQuery({
    queryKey: ["requests", projectId],
    queryFn: async (): Promise<RequestResponse[]> => {
      if (!projectId) return [];
      const { data } = await axiosClient.get(`/requests/project/${projectId}`);
      return data?.data ?? data;
    },
    enabled: !!projectId,
  });
};

export const useRequestDetail = (requestId: string | null) => {
  return useQuery({
    queryKey: ["requests", "detail", requestId],
    queryFn: async (): Promise<RequestResponse | null> => {
      if (!requestId) return null;
      const { data } = await axiosClient.get(`/requests/${requestId}`);
      return data?.data ?? data;
    },
    enabled: !!requestId,
  });
};

// Mutations
export const useCreateRequest = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateRequestPayload) => {
      const { data } = await axiosClient.post(`/requests`, payload);
      return data?.data ?? data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["requests", variables.projectId],
      });
      toast.success("Tạo Request thành công");
    },
    onError: () => {
      toast.error("Tạo Request thất bại");
    },
  });
};

export const useDeleteRequest = (projectId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axiosClient.delete(`/requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests", projectId] });
      toast.success("Xóa Request thành công");
    },
    onError: () => {
      toast.error("Xóa Request thất bại");
    },
  });
};
