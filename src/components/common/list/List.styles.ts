import styled from "styled-components";

import { colors } from "@/styles/colors";

export const ListContainer = styled.div<{ $variant: "default" | "danger" }>`
  overflow: hidden;
  border: 1px solid
    ${({ $variant }) =>
      $variant === "danger" ? colors.redLight : colors.borderLight};
  border-radius: 6px;
  background-color: ${colors.backgroundCard};

  /* Border giữa các items giống GitHub */
  & > div:not(:last-child) {
    border-bottom: 1px solid
      ${({ $variant }) =>
        $variant === "danger" ? colors.redLight : colors.borderLight};
  }
`;

export const ListItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;
