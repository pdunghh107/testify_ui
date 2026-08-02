import { type ReactNode } from "react";
import { Flex } from "@/components/layout/flex/Flex";
import { useSidebarContext } from "./SidebarContext";
import styled from "styled-components";
import { fonts } from "@/styles/fonts";
import { colors } from "@/styles/colors";

export interface SidebarGroupProps {
  children: ReactNode;
  isFirst?: boolean;
}

export const SidebarGroup = ({ children, isFirst }: SidebarGroupProps) => {
  return <NavGroupWrapper $isFirst={isFirst}>{children}</NavGroupWrapper>;
};

const NavGroupWrapper = styled.div<{ $isFirst?: boolean }>`
  margin-top: ${({ $isFirst }) => ($isFirst ? "0" : "24px")};
`;

export const SidebarGroupLabel = ({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) => {
  const { collapsed } = useSidebarContext();
  if (collapsed) return null;

  return (
    <Flex
      align="center"
      justify="space-between"
      style={{ paddingRight: "16px" }}
    >
      <SectionTitle>{children}</SectionTitle>
      {action && <div style={{ marginTop: "-12px" }}>{action}</div>}
    </Flex>
  );
};

const SectionTitle = styled.div`
  padding: 0 16px 8px;
  font-size: ${fonts.size.small};
  font-weight: ${fonts.weight.semibold};
  color: ${colors.sidebar.textMuted};
  text-transform: uppercase;
  letter-spacing: 0.08em;
  white-space: nowrap;
`;
