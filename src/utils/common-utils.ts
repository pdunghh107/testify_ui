import { format, isValid, formatDistanceToNow, type Locale } from "date-fns";
import { vi } from "date-fns/locale";

// --- HELPER: Tuân thủ DRY, tái sử dụng cho mọi hàm cần parse số ---
const parseValidNumber = (
  val: number | string | null | undefined,
): number | null => {
  if (val === null || val === undefined || val === "") return null;
  const num = Number(val);
  return isNaN(num) ? null : num;
};

// ==========================================

/**
 * Format ngày tháng sử dụng date-fns
 * @param date - Giá trị ngày tháng (string, number, Date)
 * @param formatString - Chuỗi định dạng (Mặc định: dd/MM/yyyy)
 * @param customLocale - Locale tùy chỉnh (Mặc định: vi)
 */
export const formatDate = (
  date: string | number | Date | null | undefined,
  formatString: string = "dd/MM/yyyy",
  customLocale?: Locale,
): string | null => {
  if (!date) return null;

  const d = new Date(date);

  // Sử dụng hàm isValid của date-fns để check ngày lỗi cực kỳ an toàn
  if (!isValid(d)) return null;

  // Nếu không truyền customLocale, mặc định dùng tiếng Việt
  return format(d, formatString, { locale: customLocale || vi });
};

// ==========================================

/**
 * Hiển thị khoảng thời gian tương đối so với hiện tại
 * VD: "Khoảng 2 giờ trước", "Dưới 1 phút trước"
 */
export const formatRelativeTime = (
  date: string | number | Date | null | undefined,
): string | null => {
  if (!date) return null;

  const d = new Date(date);
  if (!isValid(d)) return null;

  // addSuffix: true sẽ tự động thêm chữ "trước" hoặc "nữa" (với tương lai)
  return formatDistanceToNow(d, { locale: vi, addSuffix: true });
};

// ==========================================

/**
 * Format tiền tệ chuẩn Quốc Tế (Intl)
 */
export const formatCurrency = (
  amount: number | string | null | undefined,
  currency: string = "VND",
  locale: string = "vi-VN",
  options?: Intl.NumberFormatOptions,
): string => {
  // Trả về 0 nếu dữ liệu đầu vào không hợp lệ
  const num = parseValidNumber(amount) ?? 0;

  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    ...options,
  }).format(num);
};

// ==========================================

/**
 * Format phần trăm chuẩn Quốc Tế (Intl)
 */
export const formatPercent = (
  value: number | string | null | undefined,
  locale: string = "vi-VN",
  options?: Intl.NumberFormatOptions,
): string => {
  const num = parseValidNumber(value) ?? 0;

  // Sử dụng sức mạnh của Intl, tự động nhận diện 0.03 -> 3%
  return new Intl.NumberFormat(locale, {
    style: "percent",
    maximumFractionDigits: 2, // Làm tròn tối đa 2 chữ số thập phân
    ...options,
  }).format(num);
};
