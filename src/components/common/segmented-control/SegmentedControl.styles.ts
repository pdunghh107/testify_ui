import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const SegmentedRoot = styled.div`
  display: inline-flex;
  align-items: center;
  position: relative;
  background-color: ${colors.backgroundHover};
  border-radius: 8px;
  padding: 4px;
  user-select: none;
`;

export const SegmentedIndicator = styled.div<{ $width: number; $left: number; $isVisible: boolean }>`
  position: absolute;
  top: 4px;
  bottom: 4px;
  left: 0;
  width: ${({ $width }) => $width}px;
  transform: translateX(${({ $left }) => $left}px);
  background-color: ${colors.backgroundCard};
  border-radius: 6px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
  transition: transform 0.25s cubic-bezier(0.2, 0, 0, 1), width 0.25s cubic-bezier(0.2, 0, 0, 1);
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  pointer-events: none;
  z-index: 1;
`;

export const SegmentedButton = styled.button<{ $isActive: boolean }>`
  position: relative;
  z-index: 2;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 6px 16px;
  background: transparent;
  border: none;
  border-radius: 6px;
  color: ${({ $isActive }) => ($isActive ? colors.textMain : colors.textMuted)};
  font-family: ${fonts.family.base};
  font-size: 14px;
  font-weight: ${({ $isActive }) => ($isActive ? 600 : 500)};
  cursor: pointer;
  white-space: nowrap;
  transition: color 0.2s ease;
  outline: none;

  &:hover {
    color: ${({ $isActive }) => ($isActive ? colors.textMain : colors.primary)};
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  
  &:focus-visible {
    box-shadow: 0 0 0 2px ${colors.primaryLight}, 0 0 0 4px ${colors.primary};
  }
`;
