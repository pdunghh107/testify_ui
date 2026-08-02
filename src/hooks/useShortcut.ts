import { useEffect } from "react";

export function useShortcut(key: string, callback: () => void, ctrl = false) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((ctrl ? (e.ctrlKey || e.metaKey) : true) && e.key.toLowerCase() === key.toLowerCase()) {
        e.preventDefault();
        callback();
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [key, callback, ctrl]);
}
