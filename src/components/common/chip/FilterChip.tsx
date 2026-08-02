import React from "react";
import styled, { css } from "styled-components";
import { colors } from "../../../styles/colors";

export interface FilterChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  onRemove?: (e: React.MouseEvent) => void;
  children: React.ReactNode;
}

const StyledChip = styled.button<{ $active?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 12px;
  font-size: 12px;
  font-weight: 600;
  border-radius: 8px;
  border: 1px solid ${colors.borderLight};
  background: ${colors.backgroundCard};
  color: ${colors.textMuted};
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:hover {
    background: ${colors.backgroundHover};
    border-color: ${colors.borderDefault};
  }

  ${({ $active }) =>
    $active &&
    css`
      background: ${colors.primary} !important;
      color: #ffffff !important;
      border-color: ${colors.primary} !important;
      box-shadow: 0 4px 10px rgba(37, 99, 235, 0.2);
    `}
`;

const RemoveIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  margin-left: 2px;
  opacity: 0.7;
  transition: all 0.2s;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.2);
  }

  svg {
    width: 10px;
    height: 10px;
  }
`;

export const FilterChip = React.forwardRef<HTMLButtonElement, FilterChipProps>(
  ({ active = false, onRemove, children, ...props }, ref) => {
    return (
      <StyledChip ref={ref} $active={active} {...props}>
        {children}
        {onRemove && (
          <RemoveIcon
            onClick={(e) => {
              e.stopPropagation();
              onRemove(e);
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </RemoveIcon>
        )}
      </StyledChip>
    );
  }
);

FilterChip.displayName = "FilterChip";
