import styled, { css } from "styled-components";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

export const AccordionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const AccordionHeader = styled.div<{ $isActive?: boolean; $paddingLeft?: number }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 24px;
  padding-left: ${({ $paddingLeft }) => $paddingLeft ? `${$paddingLeft}px` : "24px"};
  color: ${colors.sidebar.text};
  font-size: ${fonts.size.base};
  font-weight: ${fonts.weight.medium};
  cursor: pointer;
  transition: all 0.2s;
  user-select: none;

  &:hover {
    background: ${colors.sidebar.hover};
  }

  ${({ $isActive }) =>
    $isActive &&
    css`
      background: ${colors.sidebar.active};
      color: ${colors.primaryLight};
      /* Để tránh border phải ở đây trùng với border phải của child, ta tùy chọn border 
         nhưng thông thường active accordion header ở sidebar cũng nên highlight */
      border-right: 3px solid ${colors.primary};
    `}
`;

export const AccordionHeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
  overflow: hidden;
`;

export const AccordionIconWrapper = styled.div<{ $isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 2px;
  margin-left: -6px;
  border-radius: 4px;
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(90deg)" : "rotate(0deg)")};

  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

export const AccordionTitle = styled.span<{ $collapsed?: boolean }>`
  transition: opacity 0.2s, width 0.2s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      opacity: 0;
      width: 0;
      display: none;
    `}
`;

export const AccordionActions = styled.div`
  display: flex;
  align-items: center;
`;

export const AccordionContent = styled.div<{ $isOpen: boolean }>`
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
  
  /* An elegant way to handle CSS transitions for auto height is using a large max-height 
     and animating it, but it needs to be carefully tuned. 1000px is usually enough for sidebars. */
  max-height: ${({ $isOpen }) => ($isOpen ? "2000px" : "0")};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
  visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
`;
