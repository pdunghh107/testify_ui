import { useNavigate, useLocation } from "@tanstack/react-router";

/**
 * Hook quản lý trạng thái URL Query Parameters
 * Tương thích với @tanstack/react-router
 */
export function useQueryParams<T = Record<string, any>>(defaultValues?: Partial<T>) {
  const navigate = useNavigate();

  // Đọc params từ URL (dùng useLocation không truyền params để tránh mọi lỗi type-checking)
  const location = useLocation();
  const queryParams = location.search as unknown as T;

  // Loại bỏ các tham số rỗng ("", null, undefined) và các tham số bằng giá trị mặc định
  const cleanParams = (params: Record<string, any>) => {
    return Object.fromEntries(
      Object.entries(params).filter(
        ([key, value]) =>
          value !== "" &&
          value !== null &&
          value !== undefined &&
          value !== defaultValues?.[key as keyof T]
      )
    );
  };

  // Cập nhật nhiều tham số cùng lúc
  const setParams = (newParams: Partial<T>) => {
    navigate({
      search: (prev: Record<string, unknown>) => {
        const merged = { ...prev, ...newParams };
        return cleanParams(merged);
      },
    } as any);
  };

  // Cập nhật 1 tham số duy nhất
  const setParam = (key: keyof T, value: any) => {
    setParams({ [key]: value } as Partial<T>);
  };

  // Xóa 1 tham số
  const removeParam = (key: keyof T) => {
    navigate({
      search: (prev: Record<string, unknown>) => {
        const next = { ...prev };
        delete next[key as string];
        return next;
      },
    } as any);
  };

  // Xóa sạch tất cả params
  const clearParams = () => {
    navigate({ search: {} } as any);
  };

  return {
    queryParams,
    setParams,
    setParam,
    removeParam,
    clearParams,
  };
}
