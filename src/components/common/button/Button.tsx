import { Loader2 } from "lucide-react";
import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from "react";
import styled, { css } from "styled-components";

import { spin } from "../animations/keyframes";

/**
 * Các biến thể giao diện của Button.
 */
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "outline"
  | "ghost"
  | "link";

/**
 * Cấu hình Props cho component Button.
 */
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const SpinningIcon = styled(Loader2)`
  animation: ${spin} 1s linear infinite;
`;

// 2. Map CSS cho từng Variant (Map chính xác với theme colors CRM)
const variantStyles = {
  primary: css`
    border: 1px solid transparent;
    color: ${({ theme }) => theme.colors.textInverse};
    background-color: ${({ theme }) => theme.colors.primary};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    border: 1px solid transparent;
    color: ${({ theme }) => theme.colors.textInverse};
    background-color: ${({ theme }) => theme.colors.secondary};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondaryHover};
    }
  `,
  danger: css`
    border: 1px solid transparent;
    color: ${({ theme }) => theme.colors.textInverse};
    background-color: ${({ theme }) => theme.colors.danger};

    &:hover:not(:disabled) {
      /* Dùng redDark từ dải 12 màu của bạn làm hover cho danger */
      background-color: ${({ theme }) => theme.colors.redDark};
    }
  `,
  outline: css`
    border: 1px solid ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.primary};
    background-color: transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryLight};
    }
  `,
  ghost: css`
    border: 1px solid transparent;
    color: ${({ theme }) => theme.colors.textMain};
    background-color: transparent;

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.backgroundHover};
    }
  `,
  link: css`
    padding: 0;
    border: 1px solid transparent;
    color: ${({ theme }) => theme.colors.primary};
    background-color: transparent;

    &:hover:not(:disabled) {
      text-decoration: underline;
    }
  `,
};

// 3. Base Styled Button
const StyledButton = styled.button<{
  $variant: ButtonVariant;
  $isLoading?: boolean;
  $isIconOnly?: boolean;
}>`
  cursor: pointer;

  display: inline-flex;
  gap: 8px;
  align-items: center;
  justify-content: center;

  font-family: ${({ theme }) => theme.fonts.family.base};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};

  transition: all 0.2s ease-in-out;

  /* Nếu là IconButton: hình vuông/tròn (tùy chỉnh), ngược lại padding hình chữ nhật */
  aspect-ratio: ${({ $isIconOnly }) => ($isIconOnly ? "1 / 1" : "auto")};
  padding: ${({ $isIconOnly }) => ($isIconOnly ? "8px" : "8px 16px")};
  border-radius: ${({ $isIconOnly }) => ($isIconOnly ? "8px" : "6px")};

  /* Xóa gạch chân khi hover của base html (trừ link) */
  text-decoration: none;

  /* Apply Variant Styles */
  ${({ $variant }) => variantStyles[$variant]}

  /* Disabled & Loading State */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    ${({ $isLoading }) =>
      !$isLoading &&
      css`
        filter: grayscale(0.5);
      `}
  }
`;

/**
 * Component Button linh hoạt cho mọi tương tác trong ứng dụng.
 * Hỗ trợ trạng thái loading, disabled, và tích hợp icon 2 bên.
 *
 * @example
 * ```tsx
 * <Button variant="primary" leftIcon={<Plus size={16} />} onClick={handleCreate}>
 *   Tạo mới
 * </Button>
 * ```
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $isLoading={isLoading}
        $isIconOnly={false}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? <SpinningIcon size={18} /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </StyledButton>
    );
  },
);
Button.displayName = "Button";

/**
 * Cấu hình Props cho component IconButton.
 */
export interface IconButtonProps extends Omit<
  ButtonProps,
  "children" | "leftIcon" | "rightIcon"
> {
  icon: ReactNode;
  "aria-label": string; // BẮT BUỘC để Screen Reader đọc
}

/**
 * Component IconButton chuyên dụng để hiển thị một nút chỉ chứa Icon (không có text).
 * Đảm bảo tỉ lệ khung hình vuông và tự động hỗ trợ Tooltip qua thẻ `title`.
 *
 * @example
 * ```tsx
 * <IconButton 
 *   icon={<Trash size={16} />} 
 *   variant="danger" 
 *   aria-label="Xóa mục này" 
 *   onClick={handleDelete} 
 * />
 * ```
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      icon,
      variant = "ghost",
      isLoading,
      "aria-label": ariaLabel,
      disabled,
      ...props
    },
    ref,
  ) => {
    return (
      <StyledButton
        ref={ref}
        $variant={variant}
        $isLoading={isLoading}
        $isIconOnly={true}
        disabled={disabled || isLoading}
        aria-label={ariaLabel}
        title={ariaLabel} // Hiển thị tooltip cơ bản khi hover
        {...props}
      >
        {isLoading ? <SpinningIcon size={18} /> : icon}
      </StyledButton>
    );
  },
);
IconButton.displayName = "IconButton";

// 6. Semantic Wrappers (Sugar syntax)

/**
 * Nút nhấn ưu tiên (Primary).
 * @example <PrimaryButton>Lưu thông tin</PrimaryButton>
 */
export const PrimaryButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant">
>((props, ref) => <Button ref={ref} variant="primary" {...props} />);
export const SecondaryButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant">
>((props, ref) => <Button ref={ref} variant="secondary" {...props} />);
export const DangerButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant">
>((props, ref) => <Button ref={ref} variant="danger" {...props} />);
export const OutlineButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant">
>((props, ref) => <Button ref={ref} variant="outline" {...props} />);
export const GhostButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, "variant">
>((props, ref) => <Button ref={ref} variant="ghost" {...props} />);
