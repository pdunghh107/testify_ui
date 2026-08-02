import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import styled, { css } from "styled-components";
import { spin } from "../animations/keyframes";
import { Loader2 } from "lucide-react";

// 1. Định nghĩa các Variants
export type ButtonVariant =
  | "primary"
  | "secondary"
  | "danger"
  | "outline"
  | "ghost"
  | "link";

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
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.textInverse};
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryHover};
    }
  `,
  secondary: css`
    background-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.textInverse};
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.secondaryHover};
    }
  `,
  danger: css`
    background-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.textInverse};
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      /* Dùng redDark từ dải 12 màu của bạn làm hover cho danger */
      background-color: ${({ theme }) => theme.colors.redDark};
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid ${({ theme }) => theme.colors.primary};
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.primaryLight};
    }
  `,
  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.textMain};
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.backgroundHover};
    }
  `,
  link: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 1px solid transparent;
    padding: 0;
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
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: ${({ theme }) => theme.fonts.size.base};

  /* Nếu là IconButton: hình vuông/tròn (tùy chỉnh), ngược lại padding hình chữ nhật */
  border-radius: ${({ $isIconOnly }) => ($isIconOnly ? "8px" : "6px")};
  padding: ${({ $isIconOnly }) => ($isIconOnly ? "8px" : "8px 16px")};
  aspect-ratio: ${({ $isIconOnly }) => ($isIconOnly ? "1 / 1" : "auto")};

  /* Xóa gạch chân khi hover của base html (trừ link) */
  text-decoration: none;

  /* Apply Variant Styles */
  ${({ $variant }) => variantStyles[$variant]}

  /* Disabled & Loading State */
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    ${({ $isLoading }) =>
      !$isLoading &&
      css`
        filter: grayscale(0.5);
      `}
  }
`;

// 4. Component Chính: Button
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

// 5. Component Chính: IconButton (A11y Trick)
export interface IconButtonProps extends Omit<
  ButtonProps,
  "children" | "leftIcon" | "rightIcon"
> {
  icon: ReactNode;
  "aria-label": string; // BẮT BUỘC để Screen Reader đọc
}

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
