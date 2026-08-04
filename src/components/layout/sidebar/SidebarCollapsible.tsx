import { ChevronDown, ChevronRight } from "lucide-react";
import React, { createContext, type ReactNode, useContext } from "react";
import styled from "styled-components";

import { slideDownAnimation } from "@/components/animations/slideDown";

import { Flex } from "../flex";
import { useSidebarContext } from "./SidebarContext";

/**
 * Giá trị của Context dành cho SidebarCollapsible.
 */
export interface SidebarCollapsibleContextValue {
  isOpen: boolean;
  onToggle: (e: React.MouseEvent) => void;
  level: number;
}

const SidebarCollapsibleContext = createContext<
  SidebarCollapsibleContextValue | undefined
>(undefined);

export const useSidebarCollapsibleContext = () => {
  const context = useContext(SidebarCollapsibleContext);
  if (!context) {
    throw new Error(
      "useSidebarCollapsibleContext must be used within SidebarCollapsible",
    );
  }
  return context;
};

/**
 * Component Wrapper cho một mục Sidebar có thể mở rộng/thu gọn (chứa menu con).
 * Cung cấp Context cho các thành phần con như Trigger, Icon, Content.
 *
 * @example
 * ```tsx
 * <SidebarCollapsible isOpen={true} onToggle={() => {}} level={0}>
 *   <SidebarItem prefix={<SidebarCollapsibleTrigger><SidebarCollapsibleIcon /></SidebarCollapsibleTrigger>}>
 *     Menu có chứa menu con
 *   </SidebarItem>
 *   <SidebarCollapsibleContent>
 *     <SidebarItem>Menu con</SidebarItem>
 *   </SidebarCollapsibleContent>
 * </SidebarCollapsible>
 * ```
 */
export const SidebarCollapsible = ({
  children,
  isOpen,
  onToggle,
  level = 0,
}: {
  children: ReactNode;
  isOpen: boolean;
  onToggle: (e: React.MouseEvent) => void;
  level?: number;
}) => {
  return (
    <SidebarCollapsibleContext.Provider value={{ isOpen, onToggle, level }}>
      {children}
    </SidebarCollapsibleContext.Provider>
  );
};

export const SidebarCollapsibleTrigger = ({
  asChild,
  children,
}: {
  asChild?: boolean;
  children: ReactNode;
}) => {
  const { onToggle } = useSidebarCollapsibleContext();

  if (asChild && React.isValidElement(children)) {
    const childElement = children as React.ReactElement<any>;
    return React.cloneElement(childElement, {
      onClick: (e: React.MouseEvent) => {
        onToggle(e);
        if (childElement.props.onClick) {
          childElement.props.onClick(e);
        }
      },
    });
  }

  return (
    <div
      onClick={onToggle}
      style={{ cursor: "pointer", display: "inline-block" }}
    >
      {children}
    </div>
  );
};

export const SidebarCollapsibleIcon = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { collapsed } = useSidebarContext();
  const { isOpen } = useSidebarCollapsibleContext();

  if (collapsed) return null;

  return (
    <Flex
      ref={ref}
      {...props}
      align="center"
      style={{
        ...props.style,
      }}
    >
      {isOpen ? <ChevronDown size={12} /> : <ChevronRight size={12} />}
    </Flex>
  );
});

export const SidebarCollapsibleContent = ({
  children,
}: {
  children: ReactNode;
}) => {
  const { collapsed } = useSidebarContext();
  const { isOpen } = useSidebarCollapsibleContext();

  if (collapsed) return null;

  return (
    <StyledChildrenWrapper $animated={true} $isOpen={isOpen}>
      {children}
    </StyledChildrenWrapper>
  );
};

const StyledChildrenWrapper = styled.div<{
  $animated: boolean;
  $isOpen: boolean;
}>`
  ${({ $animated, $isOpen }) =>
    $animated && $isOpen ? slideDownAnimation : ""}

  display: ${({ $isOpen }) => ($isOpen ? "block" : "none")};
`;
