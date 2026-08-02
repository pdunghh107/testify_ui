import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { axiosClient } from "@/api/axiosClient";

// Types
export interface RequestResponse {
  id: string;
  workspaceId: string;
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
  workspaceId: string;
  folderId?: string;
  name: string;
  url: string;
  method: string;
  headers: Record<string, string>;
  bodyTemplate: string;
  defaultRuleId?: string;
}

// Queries
export const useRequests = (workspaceId: string | null) => {
  return useQuery({
    queryKey: ["requests", workspaceId],
    queryFn: async (): Promise<RequestResponse[]> => {
      if (!workspaceId) return [];
      const { data } = await axiosClient.get(`/requests/workspace/${workspaceId}`);
      return data?.data ?? data;
    },
    enabled: !!workspaceId,
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
        queryKey: ["requests", variables.workspaceId],
      });
      toast.success("Tạo Request thành công");
    },
    onError: () => {
      toast.error("Tạo Request thất bại");
    },
  });
};

export const useDeleteRequest = (workspaceId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      await axiosClient.delete(`/requests/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["requests", workspaceId] });
      toast.success("Xóa Request thành công");
    },
    onError: () => {
      toast.error("Xóa Request thất bại");
    },
  });
};
