import React from "react";
import { AlertTriangle } from "lucide-react";
import { Modal } from "./Modal";
import { Text } from "@/components/common/text";

/**
 * Cấu hình Props cho ConfirmModal.
 */
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  body?: React.ReactNode;
  isLoading?: boolean;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "default" | "info";
  icon?: React.ReactNode;
}

/**
 * Component Modal chuyên dụng cho các hộp thoại xác nhận (Xóa, Cảnh báo).
 * Là một wrapper của `Modal` component.
 *
 * @example
 * ```tsx
 * <ConfirmModal
 *   isOpen={isOpen}
 *   onClose={() => setIsOpen(false)}
 *   onConfirm={() => deleteItem()}
 *   title="Xác nhận xóa"
 *   body="Bạn có chắc chắn muốn xóa bản ghi này không?"
 *   type="danger"
 * />
 * ```
 */
export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  body,
  isLoading = false,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  type = "danger",
  icon = <AlertTriangle size={24} />,
}: ConfirmModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      type={type}
      icon={icon}
      submitText={confirmText}
      cancelText={cancelText}
      isLoading={isLoading}
      onConfirm={(e) => {
        if (e) e.preventDefault();
        onConfirm();
      }}
      maxWidth="480px"
    >
      {body && (
        <Text variant="baseRegular" style={{ marginTop: 8 }}>
          {body}
        </Text>
      )}
    </Modal>
  );
}
