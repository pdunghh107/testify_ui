import { Link } from "@tanstack/react-router";
import { type ReactNode } from "react";
import styled, { css } from "styled-components";

import { Flex } from "@/components/layout/flex";
import { colors } from "@/styles/colors";
import { fonts } from "@/styles/fonts";

import { useSidebarCollapsibleContext } from "./SidebarCollapsible";
import { useSidebarContext } from "./SidebarContext";

export interface SidebarItemProps {
  children: ReactNode;
  icon?: any;
  prefix?: ReactNode;
  isActive?: boolean;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  actions?: ReactNode;
  level?: number;
}

export const SidebarItem = ({
  children,
  icon: Icon,
  prefix,
  isActive,
  href,
  onClick,
  actions,
  level,
}: SidebarItemProps) => {
  const { collapsed, onMobileClose } = useSidebarContext();

  // Attempt to get level from collapsible context if not provided
  let currentLevel = level ?? 0;
  try {
    const ctx = useSidebarCollapsibleContext();
    if (level === undefined) {
      currentLevel = ctx.level + 1;
    }
  } catch (e) {
    // Not inside a collapsible, ignore
  }

  const content = (
    <Flex
      align="center"
      justify="space-between"
      style={{
        width: "100%",
      }}
    >
      <Flex align="center" gap={8}>
        {prefix
          ? prefix
          : currentLevel > 0 &&
            !collapsed && <div style={{ width: 14, marginLeft: "-8px" }} />}

        {Icon && <Icon size={12} />}
        <NavLabel $collapsed={collapsed}>{children}</NavLabel>
      </Flex>
      {actions}
    </Flex>
  );

  return (
    <StyledNavItem
      as={href ? undefined : "div"}
      to={href}
      activeProps={href ? { className: "active" } : undefined}
      activeOptions={href ? { exact: href === "/" } : undefined}
      className={isActive ? "active" : ""}
      onClick={(e) => {
        if (onClick) onClick(e);
        if (href && onMobileClose) onMobileClose();
      }}
      title={typeof children === "string" ? children : undefined}
      style={{ paddingLeft: `${currentLevel * 16 + 24}px` }}
    >
      {content}
    </StyledNavItem>
  );
};

const NavLabel = styled.span<{ $collapsed: boolean }>`
  transition:
    opacity 0.2s,
    width 0.2s;
  white-space: nowrap;

  ${({ $collapsed }) =>
    $collapsed &&
    css`
      opacity: 0;
      width: 0;
      display: none;
    `}
`;
const StyledNavItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  color: ${colors.sidebar.text};
  text-decoration: none;
  font-size: ${fonts.size.small};
  font-weight: ${fonts.weight.medium};
  transition: all 0.2s;
  cursor: pointer;

  &:hover {
    background: ${colors.sidebar.hover};
  }

  &.active {
    background: ${colors.sidebar.active};
    color: ${colors.primaryLight};
    border-right: 3px solid ${colors.primary};
  }
`;
