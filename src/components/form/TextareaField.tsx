import { type TextareaHTMLAttributes, type ReactNode } from "react";
import { useFormContext } from "react-hook-form";
import styled from "styled-components";
import { RequiredAsterisk } from "./RequiredAsterisk";

// --------------------------------------------------------
// 1. INTERFACE
// --------------------------------------------------------
export interface RHFTextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string; // BẮT BUỘC để map với React Hook Form
  label?: string | ReactNode;
  helperText?: ReactNode;
  containerClassName?: string;
}

// --------------------------------------------------------
// 2. STYLED COMPONENTS
// --------------------------------------------------------
const TextareaContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-size: ${({ theme }) => theme.fonts.size.small};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 6px;
`;

const StyledTextarea = styled.textarea<{
  $hasError: boolean;
}>`
  width: 100%;
  min-height: 100px; /* Khác InputField: Textarea cần chiều cao lớn hơn mặc định */
  border-radius: 6px;
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-size: ${({ theme }) => theme.fonts.size.base};
  color: ${({ theme }) => theme.colors.textMain};
  background-color: ${({ theme, disabled }) =>
    disabled ? theme.colors.backgroundHover : theme.colors.backgroundCard};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.borderDefault};

  padding: 12px;
  outline: none;
  transition: all 0.2s ease-in-out;
  resize: none; /* KHÓA THAY ĐỔI KÍCH THƯỚC NHƯ YÊU CẦU */

  &:focus {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    /* Focus Ring Box Shadow */
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? theme.colors.dangerLight : theme.colors.primaryLight};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textMuted};
  }

  &:disabled {
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.textDisabled};
  }

  &:read-only {
    cursor: default;
  }
`;

const HelperMessage = styled.p<{ $isError?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-size: ${({ theme }) => theme.fonts.size.small};
  color: ${({ theme, $isError }) =>
    $isError ? theme.colors.danger : theme.colors.textMuted};
  margin-top: 4px;
`;

// --------------------------------------------------------
// 3. COMPONENT CHÍNH
// --------------------------------------------------------
export function TextareaField({
  name,
  label,
  helperText,
  containerClassName,
  className,
  required,
  ...props
}: RHFTextareaProps) {
  // Tự động kéo context từ <Form>
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Lấy lỗi tương ứng với "name"
  const errorMessage = errors[name]?.message as string | undefined;

  return (
    <TextareaContainer className={containerClassName}>
      {/* Label */}
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <RequiredAsterisk />}
        </Label>
      )}

      {/* Box Textarea */}
      <StyledTextarea
        id={name}
        $hasError={!!errorMessage}
        className={className}
        required={required}
        {...register(name)}
        {...props}
      />

      {/* Dòng chữ hỗ trợ hoặc Báo lỗi */}
      {errorMessage ? (
        <HelperMessage $isError>{errorMessage}</HelperMessage>
      ) : helperText ? (
        <HelperMessage>{helperText}</HelperMessage>
      ) : null}
    </TextareaContainer>
  );
}
