import { createContext, useState, useCallback, type ReactNode } from "react";
import { ConfirmModal } from "@/components/overlay/modal/ConfirmModal";

export interface ConfirmOptions {
  title: string;
  body: ReactNode | string;
  confirmText?: string;
  type?: "danger" | "default" | "info";
  action?: () => Promise<void>;
}

interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>;
}

export const ConfirmContext = createContext<ConfirmContextValue | undefined>(
  undefined,
);

export const ConfirmProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({
    title: "",
    body: "",
  });

  const [resolveFn, setResolveFn] = useState<((value: boolean) => void) | null>(
    null,
  );

  const confirm = useCallback((opts: ConfirmOptions) => {
    setOptions(opts);
    setIsOpen(true);
    setIsConfirming(false);
    return new Promise<boolean>((resolve) => {
      setResolveFn(() => resolve);
    });
  }, []);

  const handleConfirm = async () => {
    if (options.action) {
      setIsConfirming(true);
      try {
        await options.action();
        if (resolveFn) resolveFn(true);
        setIsOpen(false);
      } catch (error) {
        // Lỗi thường được catch và hiển thị toast trong action hook
        console.error("Confirm action failed", error);
      } finally {
        setIsConfirming(false);
      }
    } else {
      if (resolveFn) resolveFn(true);
      setIsOpen(false);
    }
  };

  const handleCancel = () => {
    if (resolveFn) resolveFn(false);
    setIsOpen(false);
  };

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      <ConfirmModal
        isOpen={isOpen}
        onClose={handleCancel}
        title={options.title}
        body={options.body}
        confirmText={options.confirmText || "Xác nhận"}
        type={options.type || "default"}
        isLoading={isConfirming}
        onConfirm={handleConfirm}
      />
    </ConfirmContext.Provider>
  );
};
