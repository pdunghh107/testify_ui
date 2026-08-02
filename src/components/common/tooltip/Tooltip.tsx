import {
  type ReactNode,
  type ReactElement,
  useState,
  useRef,
  cloneElement,
} from "react";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  useTransitionStyles,
  FloatingPortal,
  FloatingArrow,
  arrow,
  type Placement,
} from "@floating-ui/react";
import styled from "styled-components";

// 1. Giao diện Props
export interface TooltipProps {
  content: ReactNode; // Nội dung Tooltip
  children: ReactElement; // Component con bị bọc (VD: IconButton)
  delay?: number; // Mặc định 300ms
  placement?: Placement; // Thay vì 'position', floating-ui dùng 'placement'
}

// 2. Styled Components
const TooltipContent = styled.div`
  z-index: 9999;
  background-color: #1f2937; /* Màu xám đậm chuẩn mực */
  color: #ffffff;
  font-size: 12px;
  font-weight: 500;
  padding: 6px 10px;
  border-radius: 6px;
  white-space: nowrap;
  pointer-events: none; /* Tránh flickering khi chuột dính vào tooltip */
  font-family: ${({ theme }) => theme.fonts.family.base};
  box-shadow:
    0px 4px 6px -1px rgba(0, 0, 0, 0.1),
    0px 2px 4px -1px rgba(0, 0, 0, 0.06);
`;

// 3. Component Chính
export function Tooltip({
  content,
  children,
  delay = 300,
  placement = "top",
}: TooltipProps) {
  const [isOpen, setIsOpen] = useState(false);
  const arrowRef = useRef<SVGSVGElement>(null);

  // Floating UI Core
  const { refs, floatingStyles, context } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    // Tự động cập nhật toạ độ khi cuộn hoặc resize
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(8), // Cách phần tử gốc 8px
      flip({ fallbackAxisSideDirection: "start" }), // Tự động lật nếu không đủ chỗ
      shift({ padding: 8 }), // Tự động dời nếu đụng mép phải/trái
      arrow({ element: arrowRef }), // Tính toán mũi tên
    ],
  });

  // Tương tác (Hover, Focus, Dismiss/Click ra ngoài)
  const hover = useHover(context, {
    delay: { open: delay, close: 0 },
    move: false, // Giúp tránh giật khi di chuyển chuột nhanh
  });
  const focus = useFocus(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "tooltip" });

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role,
  ]);

  // Hiệu ứng Fade in/out
  const { isMounted, styles: transitionStyles } = useTransitionStyles(context, {
    duration: 200,
    initial: { opacity: 0 },
  });

  // Tối ưu: Nếu không có nội dung, render thẳng children
  if (!content) return children;

  return (
    <>
      {/* 
        Sử dụng cloneElement để nhồi thẳng event listener và ref vào thẻ gốc. 
        => KHÔNG ĐẺ THÊM DIV BỌC NGOÀI, giữ nguyên cấu trúc Layout cha!
      */}
      {cloneElement(
        children,
        getReferenceProps({
          ref: refs.setReference,
          ...(children.props as Record<string, unknown>),
        }),
      )}

      {/* FloatingPortal đẩy HTML của Tooltip bay thẳng ra ngoài thẻ <body> */}
      {isMounted && (
        <FloatingPortal>
          <TooltipContent
            ref={refs.setFloating}
            style={{ ...floatingStyles, ...transitionStyles }}
            {...getFloatingProps()}
          >
            {content}
            {/* Mũi tên chuẩn chỉ */}
            <FloatingArrow ref={arrowRef} context={context} fill="#1f2937" />
          </TooltipContent>
        </FloatingPortal>
      )}
    </>
  );
}
