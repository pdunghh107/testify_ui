import { useMemo } from 'react';

// 1. Định nghĩa kiểu dữ liệu cho "Từ điển" cấu hình
export interface FilterConfig {
  label: string; // Tên nhãn (vd: 'Trạng thái')
  valueMap?: Record<string, string>; // Map giá trị (vd: { '1': 'Hoạt động', '0': 'Khóa' })
  format?: (value: string) => string; // Hàm format tùy chỉnh
}

export interface FilterChipData {
  key: string;
  label: string;
  displayValue: string;
  rawValue: string;
}

// 2. Custom Hook
export function useMappedFilterChips(
  queryParams: Record<string, any>,
  config: Record<string, FilterConfig>
) {
  return useMemo(() => {
    const chips: FilterChipData[] = [];

    for (const [key, rawValue] of Object.entries(queryParams)) {
      // Bỏ qua nếu tham số rỗng hoặc không nằm trong "Từ điển" cấu hình (vd: page, limit)
      if (rawValue === undefined || rawValue === null || rawValue === '' || !config[key]) continue;

      const conf = config[key];
      let displayValue = String(rawValue);

      // Ưu tiên valueMap trước
      if (conf.valueMap && conf.valueMap[displayValue] !== undefined) {
        displayValue = conf.valueMap[displayValue];
      } 
      // Sau đó đến hàm format
      else if (conf.format) {
        displayValue = conf.format(displayValue);
      }

      chips.push({
        key,
        label: conf.label,
        displayValue,
        rawValue: String(rawValue),
      });
    }

    return chips;
  }, [queryParams, config]);
}
