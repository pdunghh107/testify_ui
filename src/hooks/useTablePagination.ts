import { useQueryParams } from "./useQueryParams";

export function useTablePagination(defaultLimit = 10) {
  const { queryParams, setParams } = useQueryParams();
  const page = Number(queryParams.page) || 1;
  const limit = Number(queryParams.limit) || defaultLimit;
  const handlePageChange = (p: number) => {
    setParams({ page: p === 1 ? undefined : p });
  };
  const handleSizeChange = (s: number) => {
    setParams({ limit: s === defaultLimit ? undefined : s, page: undefined });
  };
  return { page, limit, handlePageChange, handleSizeChange };
}
