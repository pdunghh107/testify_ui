import { colors } from "../styles/colors";

// 1. Đưa constant ra ngoài để tránh re-create memory
const VIETNAMESE_COMPANY_PREFIXES = [
  "CÔNG TY TNHH MTV", "CÔNG TY TNHH", "CÔNG TY CỔ PHẦN", "CÔNG TY CP",
  "CÔNG TY", "HỘ KINH DOANH", "HKD", "DOANH NGHIỆP", "TNHH", "CP",
];

// Thay thế mã màu cứng bằng màu từ hệ thống Design System
const AVATAR_COLORS = [
  { bg: colors.greenLightest, text: colors.greenDark },
  { bg: colors.infoLight, text: colors.info },
  { bg: colors.orangeLightest, text: colors.orangeDark },
  { bg: colors.dangerLight, text: colors.danger },
  { bg: colors.secondaryLight, text: colors.secondary },
  { bg: colors.tealLightest, text: colors.tealDark },
  { bg: colors.amberLightest, text: colors.amberDark },
  { bg: colors.redLightest, text: colors.redDark },
];

// 2. Hàm getInitials tuân thủ OCP (có thể truyền custom prefixes)
export function getInitials(name: string, prefixes = VIETNAMESE_COMPANY_PREFIXES): string {
  if (!name) return "??";

  let cleanName = name.trim().toUpperCase();
  for (const prefix of prefixes) {
    if (cleanName.startsWith(prefix)) {
      cleanName = cleanName.substring(prefix.length).trim();
      break;
    }
  }

  // Khai báo 1 lần dùng chung
  const words = cleanName.split(" ").filter(Boolean);
  
  if (words.length === 0) {
    const originalWords = name.trim().split(" ").filter(Boolean);
    return originalWords[0]?.substring(0, 2).toUpperCase() || "??";
  }

  if (words.length === 1) return words[0].substring(0, 2).toUpperCase();

  return words.slice(-2).map((w) => w[0]).join("");
}

// 3. Tách thuật toán Hash ra khỏi UI Component (Tuân thủ SRP)
export function getAvatarColors(name: string) {
  let hash = 0;
  const safeName = name || "";
  for (let i = 0; i < safeName.length; i++) {
    hash = safeName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % AVATAR_COLORS.length;
  return AVATAR_COLORS[index];
}
