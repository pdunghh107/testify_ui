import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStyles,
} from "@floating-ui/react";
import React, { useState } from "react";

import {
  DropdownMenuContainer,
  StyledDropdownHeader,
  StyledDropdownItem,
  StyledDropdownSeparator,
} from "./Dropdown.styles";

/**
 * Cấu hình Props cho component Dropdown.
 */
export interface DropdownProps {
  trigger: React.ReactNode;
  content: (onClose: () => void) => React.ReactNode;
  placement?:
    | "bottom-start"
    | "bottom-end"
    | "top-start"
    | "top-end"
    | "bottom"
    | "top"
    | "left"
    | "right";
  className?: string;
  disabled?: boolean;
}

/**
 * Component Dropdown sử dụng Floating UI để hiển thị menu xổ xuống.
 * Tự động tính toán vị trí hiển thị hợp lý tránh tràn màn hình (flip, shift).
 *
 * @example
 * ```tsx
 * <Dropdown
 *   trigger={<Button>Tuỳ chọn</Button>}
 *   content={(onClose) => (
 *     <>
 *       <DropdownItem onClick={() => { doSomething(); onClose(); }}>Sửa</DropdownItem>
 *       <DropdownSeparator />
 *       <DropdownItem variant="danger">Xoá</DropdownItem>
 *     </>
 *   )}
 * />
 * ```
 */
export function Dropdown({
  trigger,
  content,
  placement = "bottom-end",
  className,
  disabled = false,
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const {
    refs: { setReference, setFloating },
    floatingStyles,
    context,
  } = useFloating({
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
        ref={setReference}
        {...getReferenceProps()}
        style={{
          display: "inline-block",
          cursor: disabled ? "default" : "pointer",
          outline: "none",
        }}
      >
        {trigger}
      </div>

      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager context={context} modal={false}>
            <div
              ref={setFloating}
              style={{ ...floatingStyles, zIndex: 9999, outline: "none" }}
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

/**
 * Mục con (Item) bên trong Dropdown.
 */
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
