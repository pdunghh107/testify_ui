import { type ReactNode } from "react";
import styled from "styled-components";
import { Flex } from "../flex";

export const SidebarContent = ({ children }: { children: ReactNode }) => {
  return (
    <NavScrollContainer direction="column" flex={1}>
      {children}
    </NavScrollContainer>
  );
};

const NavScrollContainer = styled(Flex)`
  overflow-y: auto;
  padding: 16px 0;
  overflow-x: hidden;
`;
