import { X } from "lucide-react";
import React from "react";
import styled from "styled-components";

export const CloseTab = ({
  onClick,
}: {
  onClick?: (e: React.MouseEvent) => void;
}) => {
  return (
    <StyledCloseButton onClick={onClick} aria-label="Đóng Tab">
      <X size={14} />
    </StyledCloseButton>
  );
};

const StyledCloseButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 2px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.textMuted};

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;
