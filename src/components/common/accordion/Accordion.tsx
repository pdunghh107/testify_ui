import React, { useState, useEffect } from "react";
import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  AccordionContainer,
  AccordionHeader,
  AccordionHeaderLeft,
  AccordionIconWrapper,
  AccordionTitle,
  AccordionActions,
  AccordionContent,
} from "./Accordion.styles";

export interface AccordionProps {
  title: string;
  icon?: LucideIcon;
  isOpen?: boolean; // Controlled state (optional)
  defaultOpen?: boolean; // Uncontrolled initial state
  isActive?: boolean;
  collapsed?: boolean;
  level?: number; // Hỗ trợ thụt lề
  onClick?: () => void;
  onToggle?: (isOpen: boolean) => void;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const Accordion: React.FC<AccordionProps> = ({
  title,
  icon: Icon,
  isOpen: controlledIsOpen,
  defaultOpen = false,
  isActive = false,
  collapsed = false,
  level = 0,
  onClick,
  onToggle,
  actions,
  children,
}) => {
  const [internalIsOpen, setInternalIsOpen] = useState(defaultOpen);

  // Sync with controlled state if provided
  const isActuallyOpen =
    controlledIsOpen !== undefined ? controlledIsOpen : internalIsOpen;

  // Tự động bung Accordion ra nếu nó đang active mà chưa mở
  useEffect(() => {
    if (isActive && !isActuallyOpen) {
      if (controlledIsOpen === undefined) {
        setInternalIsOpen(true);
      }
      if (onToggle) {
        onToggle(true);
      }
    }
  }, [isActive, isActuallyOpen, controlledIsOpen, onToggle]);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const newState = !isActuallyOpen;
    
    if (controlledIsOpen === undefined) {
      setInternalIsOpen(newState);
    }
    if (onToggle) {
      onToggle(newState);
    }
  };

  const handleHeaderClick = (e: React.MouseEvent) => {
    // Nếu có onClick (chọn project/thư mục), gọi onClick. 
    // Nếu chưa mở, mở nó ra luôn.
    if (onClick) {
      onClick();
    }
    
    if (!isActuallyOpen) {
       handleToggle(e);
    }
  };

  const paddingLeft = level * 16 + 24;

  return (
    <AccordionContainer>
      <AccordionHeader
        $isActive={isActive}
        $paddingLeft={paddingLeft}
        onClick={handleHeaderClick}
        title={title}
      >
        <AccordionHeaderLeft>
          {!collapsed && (
            <AccordionIconWrapper
              $isOpen={isActuallyOpen}
              onClick={handleToggle}
            >
              <ChevronRight size={14} />
            </AccordionIconWrapper>
          )}

          {Icon && <Icon size={18} />}
          <AccordionTitle $collapsed={collapsed}>{title}</AccordionTitle>
        </AccordionHeaderLeft>

        {!collapsed && actions && (
          <AccordionActions onClick={(e) => e.stopPropagation()}>
            {actions}
          </AccordionActions>
        )}
      </AccordionHeader>

      <AccordionContent $isOpen={isActuallyOpen && !collapsed}>
        {children}
      </AccordionContent>
    </AccordionContainer>
  );
};
