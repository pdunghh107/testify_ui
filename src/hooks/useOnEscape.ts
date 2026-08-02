import { useEffect, useRef } from 'react';

export const useOnEscape = (
  handler: (event: KeyboardEvent) => void,
  enabled: boolean = true
) => {
  const handlerRef = useRef(handler);

  useEffect(() => {
    handlerRef.current = handler;
  }, [handler]);

  useEffect(() => {
    if (!enabled) return;

    const listener = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        handlerRef.current(event);
      }
    };

    document.addEventListener('keydown', listener);

    return () => {
      document.removeEventListener('keydown', listener);
    };
  }, [enabled]); // Lắng nghe dựa trên trạng thái enabled, bỏ qua handler re-renders
};
