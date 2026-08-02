import type { SelectOption } from "../api/types";

export const mapToSelectOptions = <T extends Record<string, any>>(
  data: T[] | undefined | null,
  labelKey: keyof T,
  valueKey: keyof T,
): SelectOption[] => {
  if (!data || !Array.isArray(data)) return [];
  return data.map((item) => ({
    label: String(item[labelKey]),
    value: String(item[valueKey]),
  }));
};
