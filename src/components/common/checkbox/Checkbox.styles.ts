import styled, { css } from "styled-components";
import { colors } from "../../../styles/colors";

export const CheckboxContainer = styled.label<{ $disabled?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
  user-select: none;
`;

export const HiddenInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export const StyledBox = styled.div<{
  $checked?: boolean;
  $indeterminate?: boolean;
  $variant?: "default" | "success";
  $disabled?: boolean;
}>`
  width: 20px;
  height: 20px;
  border-radius: 6px;
  border: 2px solid ${({ $disabled }) => ($disabled ? colors.borderDark : colors.borderDefault)};
  background-color: ${({ $disabled }) => ($disabled ? colors.backgroundHover : colors.backgroundApp)};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);

  /* Xử lý Focus từ bàn phím thông qua thẻ input thật */
  ${HiddenInput}:focus-visible + & {
    box-shadow: 0 0 0 3px ${colors.borderLight};
    border-color: ${colors.primary};
  }

  /* Xử lý các trạng thái tĩnh và Hover */
  ${({ $checked, $indeterminate, $variant, $disabled }) => {
    // 1. Trạng thái Unchecked
    if (!$checked && !$indeterminate) {
      return css`
        ${HiddenInput}:hover:not(:disabled) + & {
          border-color: ${colors.primary};
          background-color: ${colors.backgroundHover};
        }
      `;
    }

    // 2. Trạng thái Indeterminate
    if ($indeterminate) {
      return css`
        background-color: ${colors.borderDark};
        border-color: ${colors.borderDark};

        ${HiddenInput}:hover:not(:disabled) + & {
          background-color: ${colors.secondary};
          border-color: ${colors.secondary};
        }
      `;
    }

    // 3. Trạng thái Checked
    const color = $disabled 
      ? colors.borderDark 
      : $variant === "success" 
        ? colors.success 
        : colors.primary;

    const hoverColor = $disabled
      ? colors.borderDark
      : $variant === "success"
        ? colors.greenDark
        : colors.primaryHover;
    
    return css`
      background-color: ${color};
      border-color: ${color};

      ${HiddenInput}:hover:not(:disabled) + & {
        background-color: ${hoverColor};
        border-color: ${hoverColor};
      }
    `;
  }}
`;

export const IconWrapper = styled.div`
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: check-pop 0.2s ease-out;

  @keyframes check-pop {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }
`;

export const LabelText = styled.span`
  font-size: 14px;
  color: ${colors.textMain};
`;
