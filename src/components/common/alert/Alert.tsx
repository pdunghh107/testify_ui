import React from "react";
import {
  AlertCircle,
  CheckCircle,
  Info,
  XCircle,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  StyledAlert,
  StyledIconContainer,
  StyledCloseButton,
  AlertTitle,
  AlertBody,
  alertSizeMap,
  type AlertVariantType,
  type AlertSizeType,
} from "./Alert.styles";

export type AlertVariant = AlertVariantType;
export type AlertSize = AlertSizeType;

export interface AlertProps {
  children: React.ReactNode;
  variant?: AlertVariant;
  size?: AlertSize;
  title?: string;
  icon?: LucideIcon;
  showIcon?: boolean;
  onClose?: () => void;
  className?: string; // Hỗ trợ passing className
  style?: React.CSSProperties; // Hỗ trợ passing inline style
}

const ICONS: Record<AlertVariant, LucideIcon> = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

export const Alert: React.FC<AlertProps> = ({
  children,
  variant = "info",
  size = "md",
  title,
  icon: CustomIcon,
  showIcon = true,
  onClose,
  className,
  style,
}) => {
  const Icon = CustomIcon || ICONS[variant];
  const hasTitle = !!title;

  return (
    <StyledAlert
      role="alert"
      aria-live="assertive"
      $variant={variant}
      $size={size}
      $hasTitle={hasTitle}
      className={className}
      style={style}
    >
      {showIcon && (
        <StyledIconContainer $variant={variant} $size={size} aria-hidden="true">
          <Icon size={alertSizeMap[size].iconSize} />
        </StyledIconContainer>
      )}

      <div style={{ flex: 1 }}>
        {hasTitle && <AlertTitle $size={size}>{title}</AlertTitle>}
        <AlertBody $size={size}>{children}</AlertBody>
      </div>

      {onClose && (
        <StyledCloseButton
          type="button"
          onClick={onClose}
          aria-label="Đóng thông báo"
          $variant={variant}
          $size={size}
        >
          <X size={alertSizeMap[size].closeSize} />
        </StyledCloseButton>
      )}
    </StyledAlert>
  );
};
