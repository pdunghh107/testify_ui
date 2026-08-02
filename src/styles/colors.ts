// src/styles/colors.ts

export const colors = {
  // ==========================================
  // PHẦN 1: HỆ THỐNG MÀU LÕI CRM
  // ==========================================

  // 1. Màu chủ đạo (Primary) - Nút CTA chính, Sidebar active, Focus rings
  primary: "#2563EB",
  primaryHover: "#1D4ED8",
  primaryLight: "#EFF6FF",
  
  // Brand gradient
  brandGradient: "linear-gradient(135deg, #2563eb, #1d4ed8)",

  // 2. Màu phụ trợ (Secondary) - Nút Hủy, Quay lại, Thao tác phụ
  secondary: "#64748B",
  secondaryHover: "#475569",
  secondaryLight: "#F1F5F9",

  // 3. Hệ thống văn bản (Typography)
  textMain: "#0F172A",
  textMuted: "#64748B",
  textDisabled: "#94A3B8",
  textInverse: "#FFFFFF",

  // 4. Màu nền (Backgrounds & Surfaces)
  backgroundApp: "#F8FAFC",
  backgroundCard: "#FFFFFF",
  backgroundHover: "#F1F5F9",

  // 4.1. Sidebar (Dark Theme)
  sidebar: {
    bg: "#0F172A",
    hover: "rgba(255, 255, 255, 0.08)",
    active: "rgba(59, 130, 246, 0.2)",
    text: "rgba(255, 255, 255, 0.85)",
    textMuted: "rgba(255, 255, 255, 0.5)",
  },

  // 4.2. Tooltip
  tooltip: {
    bg: "#1E293B",
    text: "#FFFFFF",
  },

  // 5. Viền & Phân cách (Borders & Dividers)
  borderLight: "#E2E8F0",
  borderDefault: "#CBD5E1",
  borderDark: "#94A3B8",

  // 6. Trạng thái (Semantic / Status)
  success: "#16A34A",
  successLight: "#DCFCE7",
  warning: "#D97706",
  warningLight: "#FEF3C7",
  danger: "#DC2626",
  dangerLight: "#FEE2E2",
  info: "#2563EB",
  infoLight: "#DBEAFE",

  // 7. Biểu đồ thống kê cơ bản
  chart1: "#6366F1",
  chart2: "#14B8A6",
  chart3: "#F59E0B",
  chart4: "#EC4899",
  chart5: "#8B5CF6",

  // ==========================================
  // PHẦN 2: 12 MÀU VÒNG HÒA SẮC (Cấp độ: Lightest -> Light -> Base -> Dark -> Darkest)
  // ==========================================

  // 1. Red (Đỏ)
  redLightest: "#FEE2E2",
  redLight: "#FCA5A5",
  redBase: "#EF4444",
  redDark: "#B91C1C",
  redDarkest: "#7F1D1D",

  // 2. Orange (Cam)
  orangeLightest: "#FFEDD5",
  orangeLight: "#FDBA74",
  orangeBase: "#F97316",
  orangeDark: "#C2410C",
  orangeDarkest: "#7C2D12",

  // 3. Amber (Vàng Cam)
  amberLightest: "#FEF3C7",
  amberLight: "#FCD34D",
  amberBase: "#F59E0B",
  amberDark: "#B45309",
  amberDarkest: "#78350F",

  // 4. Yellow (Vàng)
  yellowLightest: "#FEF9C3",
  yellowLight: "#FDE047",
  yellowBase: "#EAB308",
  yellowDark: "#A16207",
  yellowDarkest: "#713F12",

  // 5. Lime (Vàng Xanh)
  limeLightest: "#ECFCCB",
  limeLight: "#BEF264",
  limeBase: "#84CC16",
  limeDark: "#4D7C0F",
  limeDarkest: "#365314",

  // 6. Green (Xanh lá)
  greenLightest: "#DCFCE7",
  greenLight: "#86EFAC",
  greenBase: "#22C55E",
  greenDark: "#15803D",
  greenDarkest: "#14532D",

  // 7. Teal (Xanh ngọc)
  tealLightest: "#CCFBF1",
  tealLight: "#5EEAD4",
  tealBase: "#14B8A6",
  tealDark: "#0F766E",
  tealDarkest: "#134E4A",

  // 8. Blue (Xanh dương)
  blueLightest: "#DBEAFE",
  blueLight: "#93C5FD",
  blueBase: "#3B82F6",
  blueDark: "#1D4ED8",
  blueDarkest: "#1E3A8A",

  // 9. Indigo (Xanh chàm)
  indigoLightest: "#E0E7FF",
  indigoLight: "#A5B4FC",
  indigoBase: "#6366F1",
  indigoDark: "#4338CA",
  indigoDarkest: "#312E81",

  // 10. Violet (Tím)
  violetLightest: "#EDE9FE",
  violetLight: "#C4B5FD",
  violetBase: "#8B5CF6",
  violetDark: "#6D28D9",
  violetDarkest: "#4C1D95",

  // 11. Fuchsia (Hồng cánh sen)
  fuchsiaLightest: "#FAE8FF",
  fuchsiaLight: "#F0ABFC",
  fuchsiaBase: "#D946EF",
  fuchsiaDark: "#A21CAF",
  fuchsiaDarkest: "#701A75",

  // 12. Rose (Hồng đỏ)
  roseLightest: "#FFE4E6",
  roseLight: "#FDA4AF",
  roseBase: "#F43F5E",
  roseDark: "#BE123C",
  roseDarkest: "#881337",

  // ==========================================
  // PHẦN 3: MÀU PREMIUM (Cấp bậc)
  // ==========================================
  bronzeBg: "linear-gradient(135deg, #fff7ed 0%, #ffedd5 100%)",
  bronzeText: "#9a3412",
  bronzeBorder: "#fed7aa",

  silverBg: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
  silverText: "#334155",
  silverBorder: "#e2e8f0",

  goldBg: "linear-gradient(135deg, #fefce8 0%, #fef08a 100%)",
  goldText: "#854d0e",
  goldBorder: "#fde047",

  platinumBg: "linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)",
  platinumText: "#1e40af",
  platinumBorder: "#bfdbfe",

  diamondBg: "linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)",
  diamondText: "#0f766e",
  diamondBorder: "#99f6e4",
} as const;
