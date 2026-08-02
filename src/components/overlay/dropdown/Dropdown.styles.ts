import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const DropdownMenuContainer = styled.div`
  background: ${colors.backgroundCard};
  border: 1px solid ${colors.borderLight};
  border-radius: 10px;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(0, 0, 0, 0.05);
  min-width: 200px;
  padding: 6px;
  overflow: hidden;
  font-family: ${fonts.family.base};
`;

export const StyledDropdownHeader = styled.div`
  padding: 8px 12px;
  font-size: ${fonts.size.small};
  font-weight: ${fonts.weight.medium};
  color: ${colors.textMain};
`;

export const StyledDropdownSeparator = styled.div`
  height: 1px;
  background: ${colors.borderLight};
  margin: 4px 0;
`;

export const StyledDropdownItem = styled.div<{
  $variant?: "default" | "danger";
  $disabled?: boolean;
}>`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 12px;
  border-radius: 8px;
  font-size: 13.5px;
  font-weight: ${fonts.weight.medium};
  color: ${({ $variant }) =>
    $variant === "danger" ? colors.danger : colors.textMain};
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};
  opacity: ${({ $disabled }) => ($disabled ? 0.5 : 1)};
  transition: all 0.1s;
  user-select: none;

  .dropdown-item-icon {
    flex-shrink: 0;
    color: ${({ $variant }) =>
      $variant === "danger" ? "inherit" : colors.textMuted};
    transition: color 0.1s;
  }

  &:hover {
    ${({ $disabled, $variant }) =>
      !$disabled &&
      `
      background: ${$variant === "danger" ? colors.dangerLight : colors.primaryLight};
      color: ${$variant === "danger" ? colors.danger : colors.primary};

      .dropdown-item-icon {
        color: inherit;
      }
    `}
  }
`;
