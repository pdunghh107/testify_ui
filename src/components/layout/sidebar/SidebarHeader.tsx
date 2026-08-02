import { type ReactNode } from "react";
import styled from "styled-components";
import { Flex } from "../flex";

export const SidebarHeader = ({ children }: { children: ReactNode }) => {
  return <IconWrapper align="center">{children}</IconWrapper>;
};

const IconWrapper = styled(Flex)`
  height: 60px;
  padding: 0 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
`;
