import { useEffect, useRef, type RefObject } from "react";

type EventType = MouseEvent | TouchEvent;

export const useOnClickOutside = <T extends HTMLElement = HTMLElement>(
  ref: RefObject<T | null>,
  handler: (event: EventType) => void,
  enabled: boolean = true,
) => {
  // Sử dụng ref để lưu trữ handler mới nhất,
  // giúp không cần gỡ/thêm lại event listener mỗi khi component re-render (truyền inline function)
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: EventType) => {
      // Bỏ qua nếu click vào bên trong ref element
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      // Gọi handler mới nhất
      handlerRef.current(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, enabled]); // Không cần đưa handler vào deps nữa
};
