export interface ApiResponse<T> {
  success: boolean;
  code: string;
  data: T;
  message?: string | null;
  requestId?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export interface IdNameResponse {
  id: string;
  name: string;
}

export interface CodeNameResponse {
  code: string;
  name: string;
}

export interface SelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}
