import React from "react";
import styled, { css } from "styled-components";
import { colors } from "../../../styles/colors";

// 1. Loại bỏ màu "pink" ra khỏi BaseColorVariant
export type BaseColorVariant =
  | "red" | "orange" | "amber" | "yellow" | "lime" | "green"
  | "teal" | "cyan" | "sky" | "blue" | "indigo" | "violet"
  | "fuchsia" | "rose";

export type SemanticVariant = "primary" | "success" | "error" | "warning" | "info" | "gray";

// 2. Thêm các màu Premium
export type PremiumVariant = "bronze" | "silver" | "gold" | "platinum" | "diamond";

export type BadgeVariant = BaseColorVariant | SemanticVariant | PremiumVariant;

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  // 3. Mở rộng props fill thay vì isOutline
  fill?: "light" | "solid" | "outline";
  children: React.ReactNode;
}

const getColorTokens = (variant: BadgeVariant) => {
  // 1. Mapping Premium (Gradient & Shadow)
  const premiumMap: Record<string, { bg: string; text: string; border: string; isPremium: boolean }> = {
    bronze: { bg: colors.bronzeBg, text: colors.bronzeText, border: colors.bronzeBorder, isPremium: true },
    silver: { bg: colors.silverBg, text: colors.silverText, border: colors.silverBorder, isPremium: true },
    gold: { bg: colors.goldBg, text: colors.goldText, border: colors.goldBorder, isPremium: true },
    platinum: { bg: colors.platinumBg, text: colors.platinumText, border: colors.platinumBorder, isPremium: true },
    diamond: { bg: colors.diamondBg, text: colors.diamondText, border: colors.diamondBorder, isPremium: true },
  };
  
  if (premiumMap[variant]) return premiumMap[variant];

  // 2. Mapping Semantic
  const semanticMap: Record<string, { bg: string; text: string; border: string; isPremium: boolean }> = {
    primary: { bg: colors.primaryLight, text: colors.primary, border: colors.primary, isPremium: false },
    success: { bg: colors.successLight, text: colors.success, border: colors.success, isPremium: false },
    error: { bg: colors.dangerLight, text: colors.danger, border: colors.danger, isPremium: false },
    warning: { bg: colors.warningLight, text: colors.warning, border: colors.warning, isPremium: false },
    info: { bg: colors.infoLight, text: colors.info, border: colors.info, isPremium: false },
    gray: { bg: colors.backgroundHover, text: colors.textMuted, border: colors.borderDefault, isPremium: false },
  };

  if (semanticMap[variant]) return semanticMap[variant];

  // 3. Mapping Dynamic cho các màu hòa sắc
  const baseKey = String(variant);
  return {
    bg: colors[`${baseKey}Lightest` as keyof typeof colors] as string,
    text: colors[`${baseKey}Dark` as keyof typeof colors] as string,
    border: colors[`${baseKey}Base` as keyof typeof colors] as string,
    isPremium: false,
  };
};

const StyledBadge = styled.span<{ $variant?: BadgeVariant; $fill?: "light" | "solid" | "outline" }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 2px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;

  ${({ $variant = "gray", $fill = "light" }) => {
    // Gọi DUY NHẤT 1 hàm để lấy màu
    const tokens = getColorTokens($variant);

    // 1. Nếu là Premium: Bỏ qua fill, render cố định style lấp lánh
    if (tokens.isPremium) {
      return css`
        background: ${tokens.bg};
        color: ${tokens.text};
        border: 1px solid ${tokens.border};
        box-shadow: 0 1px 2px rgba(0,0,0, 0.05);
      `;
    }

    // 2. Nếu là màu thường: Xử lý theo fill (outline, solid, light)
    if ($fill === "outline") {
      return css`
        background: transparent;
        color: ${tokens.text};
        border: 1px solid ${tokens.border};
      `;
    }
    
    if ($fill === "solid") {
      return css`
        background: ${tokens.border};
        color: #FFFFFF;
        border: 1px solid transparent;
      `;
    }

    // Default: light (Nhạt)
    return css`
      background: ${tokens.bg};
      color: ${tokens.text};
      border: 1px solid transparent;
    `;
  }}
`;

export function Badge({ variant = "gray", fill = "light", children, ...props }: BadgeProps) {
  return (
    <StyledBadge $variant={variant} $fill={fill} {...props}>
      {children}
    </StyledBadge>
  );
}

export function ConfigBadge({
  value,
  label,
  configMap,
  ...props
}: {
  value: string | undefined | null;
  label?: string;
  configMap: Record<string, { label?: string; variant: BadgeVariant; fill?: "light" | "solid" | "outline" }>;
} & React.HTMLAttributes<HTMLSpanElement>) {
  if (!value) return <Badge variant="gray" {...props}>N/A</Badge>;

  const config = configMap[value];
  const variant = config?.variant || "gray";
  
  const displayLabel = label || config?.label || value;

  return (
    <Badge variant={variant} fill={config?.fill} {...props}>
      {displayLabel}
    </Badge>
  );
}

export function IconBadge({
  icon: Icon,
  color,
  bg,
  size = 32,
  iconSize = 16,
  borderRadius = 8,
  style,
}: {
  icon: React.ElementType;
  color: string;
  bg: string;
  size?: number;
  iconSize?: number;
  borderRadius?: number;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        width: size,
        height: size,
        borderRadius,
        background: bg,
        flexShrink: 0,
        ...style,
      }}
    >
      <Icon size={iconSize} color={color} />
    </div>
  );
}
