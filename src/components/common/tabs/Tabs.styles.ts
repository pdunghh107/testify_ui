import styled from "styled-components";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export const StyledTabsList = styled.div`
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid ${colors.borderLight};
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const StyledTabTrigger = styled.button<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  background: none;
  border: none;
  border-bottom: 2px solid
    ${({ $isActive }) => ($isActive ? colors.primary : "transparent")};
  color: ${({ $isActive }) => ($isActive ? colors.primary : colors.textMuted)};
  font-family: ${fonts.family.base};
  /* Sử dụng variant từ design token */
  font-size: ${fonts.size.base};
  font-weight: ${fonts.weight.medium};
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  transition: all 0.15s;

  &:hover {
    color: ${({ $isActive }) => ($isActive ? colors.primary : colors.textMain)};
  }
`;
