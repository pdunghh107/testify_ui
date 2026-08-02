import { type InputHTMLAttributes, type ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";

import { RequiredAsterisk } from "./RequiredAsterisk";

// --------------------------------------------------------
// 1. INTERFACE
// --------------------------------------------------------
export interface RHFInputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string; // BẮT BUỘC để map với React Hook Form
  label?: string | ReactNode;
  helperText?: ReactNode;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  leftIconClickable?: boolean;
  rightIconClickable?: boolean;
  containerClassName?: string;
}

// --------------------------------------------------------
// 2. STYLED COMPONENTS (Tích hợp với theme CRM)
// --------------------------------------------------------
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin-bottom: 6px;

  font-family: ${({ theme }) => theme.fonts.family.base};
  font-size: ${({ theme }) => theme.fonts.size.small};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.textMain};
`;

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
`;

const StyledInput = styled.input<{
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
  $hasError: boolean;
}>`
  width: 100%;
  height: 40px;
  padding-right: ${({ $hasRightIcon }) => ($hasRightIcon ? "36px" : "12px")};

  /* Tính toán padding để tránh chữ đè lên Icon */
  padding-left: ${({ $hasLeftIcon }) => ($hasLeftIcon ? "36px" : "12px")};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.borderDefault};
  border-radius: 6px;

  font-family: ${({ theme }) => theme.fonts.family.base};
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: ${({ theme }) => theme.colors.textMain};

  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.backgroundHover : theme.colors.backgroundCard};
  outline: none;

  transition: all 0.2s ease-in-out;

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};

    /* Focus Ring Box Shadow xịn xò */
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? theme.colors.dangerLight : theme.colors.primaryLight};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.textDisabled};
  }

  &:read-only {
    cursor: default;
  }
`;

const IconWrapper = styled.div<{
  $position: "left" | "right";
  $isClickable?: boolean;
}>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);

  ${({ $position }) => ($position === "left" ? "left: 10px;" : "right: 10px;")}
  display: flex;
  align-items: center;
  justify-content: center;

  color: ${({ theme }) => theme.colors.textMuted};

  /* Nếu là icon có tương tác (nút bấm) thì bật pointer-events lên */
  pointer-events: ${({ $isClickable }) => ($isClickable ? "auto" : "none")};
  cursor: ${({ $isClickable }) => ($isClickable ? "pointer" : "default")};
`;

const HelperMessage = styled.p<{ $isError?: boolean }>`
  margin-top: 4px;
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-size: ${({ theme }) => theme.fonts.size.small};
  color: ${({ theme, $isError }) =>
    $isError ? theme.colors.danger : theme.colors.textMuted};
`;

// --------------------------------------------------------
// 3. COMPONENT CHÍNH
// --------------------------------------------------------
export function InputField({
  name,
  label,
  helperText,
  leftIcon,
  rightIcon,
  leftIconClickable,
  rightIconClickable,
  containerClassName,
  className,
  required,
  ...props
}: RHFInputProps) {
  // Tự động kéo context từ <Form> (nhờ FormProvider)
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Lấy lỗi tương ứng với "name"
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <InputContainer className={containerClassName}>
      {/* Label */}
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <RequiredAsterisk />}
        </Label>
      )}

      {/* Box Input */}
      <InputWrapper>
        {leftIcon && (
          <IconWrapper $position="left" $isClickable={leftIconClickable}>
            {leftIcon}
          </IconWrapper>
        )}

        <StyledInput
          id={name}
          $hasLeftIcon={!!leftIcon}
          $hasRightIcon={!!rightIcon}
          $hasError={!!errorMessage}
          className={className}
          required={required}
          // Hàm register() tự động bind ref, onChange, onBlur, value cho input
          {...register(name)}
          {...props}
        />

        {rightIcon && (
          <IconWrapper $position="right" $isClickable={rightIconClickable}>
            {rightIcon}
          </IconWrapper>
        )}
      </InputWrapper>

      {/* Dòng chữ hỗ trợ hoặc Báo lỗi (Lỗi luôn được ưu tiên hiển thị) */}
      {errorMessage ? (
        <HelperMessage $isError>{errorMessage}</HelperMessage>
      ) : helperText ? (
        <HelperMessage>{helperText}</HelperMessage>
      ) : null}
    </InputContainer>
  );
}
