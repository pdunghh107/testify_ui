import React, { useState } from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useClick,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  FloatingFocusManager,
  useTransitionStyles,
} from "@floating-ui/react";
import {
  DropdownMenuContainer,
  StyledDropdownHeader,
  StyledDropdownSeparator,
  StyledDropdownItem,
} from "./Dropdown.styles";

export interface DropdownProps {
  trigger: React.ReactNode;
  content: (onClose: () => void) => React.ReactNode;
  placement?: "bottom-start" | "bottom-end" | "top-start" | "top-end" | "bottom" | "top" | "left" | "right";
  className?: string;
  disabled?: boolean;
}

export function Dropdown({
  trigger,
  content,
  placement = "bottom-end",
  className,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    whileElementsMounted: autoUpdate,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
  });

  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 150,
    initial: {
      opacity: 0,
      transform: "translateY(-4px) scale(0.98)",
    },
  });

  const click = useClick(context, { enabled: !disabled });
  const dismiss = useDismiss(context);
  const role = useRole(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ]);

  const close = () => setIsOpen(false);

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        style={{ display: "inline-block", cursor: disabled ? "default" : "pointer" }}
      >
        {trigger}
      </div>

      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={refs.setFloating}
              style={{ ...floatingStyles, zIndex: 9999 }}
              {...getFloatingProps()}
            >
              <DropdownMenuContainer
                style={transitionStyles}
                className={className}
              >
                {content(close)}
              </DropdownMenuContainer>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}

export interface DropdownItemProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  variant?: "default" | "danger";
  disabled?: boolean;
  icon?: React.ElementType;
}

export function DropdownItem({
  children,
  onClick,
  className,
  variant = "default",
  disabled = false,
  icon: Icon,
}: DropdownItemProps) {
  return (
    <StyledDropdownItem
      $variant={variant}
      $disabled={disabled}
      className={className}
      onClick={(e) => {
        e.stopPropagation();
        if (!disabled) onClick?.(e);
      }}
    >
      {Icon && <Icon size={16} className="dropdown-item-icon" />}
      <span>{children}</span>
    </StyledDropdownItem>
  );
}

export function DropdownSeparator() {
  return <StyledDropdownSeparator />;
}

export interface DropdownHeaderProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function DropdownHeader({
  children,
  className,
  style,
}: DropdownHeaderProps) {
  return (
    <StyledDropdownHeader className={className} style={style}>
      {children}
    </StyledDropdownHeader>
  );
}
