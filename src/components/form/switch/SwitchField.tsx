import React from "react";
import styled from "styled-components";
import { useFormContext, Controller } from "react-hook-form";

// --------------------------------------------------------
// 1. INTERFACE
// --------------------------------------------------------
export interface SwitchFieldProps {
  name: string;
  label: React.ReactNode;
  description?: React.ReactNode;
  disabled?: boolean;
}

// --------------------------------------------------------
// 2. STYLED COMPONENTS
// --------------------------------------------------------
const SwitchContainer = styled.label<{ $disabled?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

const SwitchTrack = styled.div<{ $checked: boolean; $hasError: boolean }>`
  position: relative;
  width: 44px;
  height: 24px;
  border-radius: 9999px;
  background-color: ${({ theme, $checked, $hasError }) =>
    $hasError
      ? theme.colors.danger
      : $checked
      ? theme.colors.primary
      : theme.colors.borderDefault};
  transition: background-color 0.2s ease-in-out;
  flex-shrink: 0;

  &:focus-within {
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? theme.colors.dangerLight : theme.colors.primaryLight};
  }
`;

const SwitchThumb = styled.div<{ $checked: boolean }>`
  position: absolute;
  top: 2px;
  left: 2px;
  width: 20px;
  height: 20px;
  background-color: #ffffff;
  border-radius: 50%;
  transition: transform 0.2s ease-in-out;
  transform: ${({ $checked }) =>
    $checked ? "translateX(20px)" : "translateX(0)"};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
`;

const HiddenInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
`;

const TextContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelText = styled.span`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-size: ${({ theme }) => theme.fonts.size.base};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.textMain};
`;

const DescriptionText = styled.span<{ $isError?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-size: ${({ theme }) => theme.fonts.size.small};
  color: ${({ theme, $isError }) =>
    $isError ? theme.colors.danger : theme.colors.textMuted};
  margin-top: 2px;
`;

// --------------------------------------------------------
// 3. COMPONENT
// --------------------------------------------------------
export function SwitchField({
  name,
  label,
  description,
  disabled,
}: SwitchFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { error },
      }) => {
        const isChecked = !!value;
        const errorMessage = error?.message;

        return (
          <SwitchContainer $disabled={disabled}>
            <SwitchTrack $checked={isChecked} $hasError={!!errorMessage}>
              <HiddenInput
                type="checkbox"
                onChange={(e) => onChange(e.target.checked)}
                onBlur={onBlur}
                checked={isChecked}
                ref={ref}
                disabled={disabled}
              />
              <SwitchThumb $checked={isChecked} />
            </SwitchTrack>
            <TextContent>
              <LabelText>{label}</LabelText>
              {errorMessage ? (
                <DescriptionText $isError>{errorMessage}</DescriptionText>
              ) : description ? (
                <DescriptionText>{description}</DescriptionText>
              ) : null}
            </TextContent>
          </SwitchContainer>
        );
      }}
    />
  );
}
