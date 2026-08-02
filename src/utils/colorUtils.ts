import { colors } from "../styles/colors";
import type { BadgeVariant } from "../components/common/badge/Badge";

export const getHexFromVariant = (variant: BadgeVariant | string): string => {
  if (variant.startsWith("#")) return variant;

  const semanticMap: Record<string, string> = {
    primary: colors.primary,
    success: colors.success,
    error: colors.danger,
    warning: colors.warning,
    info: colors.info,
    gray: colors.textMuted,
  };

  if (semanticMap[variant]) return semanticMap[variant];

  // Lấy màu từ vòng hòa sắc 12 màu (ví dụ: red -> redBase)
  const baseColor = colors[`${variant}Base` as keyof typeof colors];
  
  return (baseColor as string) || colors.primary;
};
