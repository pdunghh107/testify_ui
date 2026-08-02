import { AxiosError } from "axios";

export const getErrorMessage = (
  error: unknown,
  fallbackMsg = "Có lỗi xảy ra"
): string => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || fallbackMsg;
  }
  if (error instanceof Error) {
    return error.message;
  }
  return fallbackMsg;
};
