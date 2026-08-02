// src/styles/fonts.ts

const family = {
  base: '"Inter", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"', // Dùng cho nội dung chung, data table
  heading: '"Poppins", sans-serif', // Dùng cho Tiêu đề, số liệu lớn trên Dashboard
} as const;

const size = {
  small: "12px", // Chú thích, tag, badge, ngày tháng phụ
  base: "14px", // Nội dung chuẩn của CRM (vừa đủ đọc, tiết kiệm không gian)
  large: "16px", // Nút CTA, Sub-heading, Input text
  xlarge: "20px", // Tiêu đề card, Modal title
  xxlarge: "24px", // Tiêu đề trang (Page title)
  xxxlarge: "32px", // Số liệu thống kê lớn (Metric numbers)
  display: "72px", // Chữ cực lớn (Ví dụ: Lỗi 404)
} as const;

const weight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const;

export const fonts = {
  family,
  size,
  weight,

  // Các bộ combo (Variants) kết hợp sẵn Size & Weight
  // Rất tiện khi dùng với Styled-components hoặc Emotion:
  // VD: ${fonts.variants.baseMedium}
  variants: {
    // --- SMALL ---
    smallRegular: { fontSize: size.small, fontWeight: weight.regular },
    smallMedium: { fontSize: size.small, fontWeight: weight.medium },
    smallSemibold: { fontSize: size.small, fontWeight: weight.semibold },
    smallBold: { fontSize: size.small, fontWeight: weight.bold },

    // --- BASE ---
    baseRegular: { fontSize: size.base, fontWeight: weight.regular },
    baseMedium: { fontSize: size.base, fontWeight: weight.medium },
    baseSemibold: { fontSize: size.base, fontWeight: weight.semibold },
    baseBold: { fontSize: size.base, fontWeight: weight.bold },

    // --- LARGE ---
    largeRegular: { fontSize: size.large, fontWeight: weight.regular },
    largeMedium: { fontSize: size.large, fontWeight: weight.medium },
    largeSemibold: { fontSize: size.large, fontWeight: weight.semibold },
    largeBold: { fontSize: size.large, fontWeight: weight.bold },

    // --- XLARGE ---
    xlargeRegular: { fontSize: size.xlarge, fontWeight: weight.regular },
    xlargeMedium: { fontSize: size.xlarge, fontWeight: weight.medium },
    xlargeSemibold: { fontSize: size.xlarge, fontWeight: weight.semibold },
    xlargeBold: { fontSize: size.xlarge, fontWeight: weight.bold },

    // --- XXLARGE ---
    xxlargeRegular: { fontSize: size.xxlarge, fontWeight: weight.regular },
    xxlargeMedium: { fontSize: size.xxlarge, fontWeight: weight.medium },
    xxlargeSemibold: { fontSize: size.xxlarge, fontWeight: weight.semibold },
    xxlargeBold: { fontSize: size.xxlarge, fontWeight: weight.bold },

    // --- XXXLARGE ---
    xxxlargeRegular: { fontSize: size.xxxlarge, fontWeight: weight.regular },
    xxxlargeMedium: { fontSize: size.xxxlarge, fontWeight: weight.medium },
    xxxlargeSemibold: { fontSize: size.xxxlarge, fontWeight: weight.semibold },
    xxxlargeBold: { fontSize: size.xxxlarge, fontWeight: weight.bold },

    // --- DISPLAY ---
    displayBold: { fontSize: size.display, fontWeight: weight.bold },
  },
} as const;
