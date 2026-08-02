"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { X, Loader2 } from "lucide-react";

import { useOnEscape } from "../../../hooks/useOnEscape";
import { useOverlayClick } from "../../../hooks/useOverlayClick";
import { Button, IconButton } from "../../common/button/Button";
import { Flex } from "../../layout/flex/Flex";
import { Text } from "../../common/text/Text";
import {
  ModalOverlay,
  ModalBox,
  ModalHeader,
  ModalBody,
  ModalFooter,
  IconWrapper,
} from "./Modal.styles";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  extraFooterActions?: React.ReactNode;
  submitText?: string;
  cancelText?: string;
  onSubmit?: (e?: React.FormEvent) => void;
  isLoading?: boolean;
  type?: "default" | "danger" | "info";
  maxWidth?: string;
  showX?: boolean;
  steps?: React.ReactNode;
  asForm?: boolean;
}

export const Modal = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  extraFooterActions,
  submitText = "Xác nhận",
  cancelText = "Hủy",
  onSubmit,
  isLoading = false,
  type = "default",
  maxWidth = "500px",
  showX = true,
  steps,
  asForm,
}: ModalProps) => {
  const [mounted, setMounted] = useState(false);
  const overlayHandlers = useOverlayClick(onClose);

  // 1. Chỉ render trên Client
  useEffect(() => {
    setMounted(true);
  }, []);

  // 2. Hook tái sử dụng chống Drag-click
  useOnEscape(onClose, isOpen);

  // 3. Khóa cuộn trang
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const isForm = asForm !== undefined ? asForm : !!onSubmit;

  // 4. Bắt sự kiện form submit (Native Enter)
  const handleSubmit = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    if (onSubmit && !isLoading) onSubmit(e as React.FormEvent);
  };

  const modalContent = (
    <ModalOverlay
      {...overlayHandlers}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <ModalBox
        as={isForm ? "form" : "div"}
        onSubmit={isForm && onSubmit ? handleSubmit : undefined}
        style={{ maxWidth }}
        // Ngăn chặn click vào trong modal bị lan ra overlay
        onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
        onMouseUp={(e: React.MouseEvent) => e.stopPropagation()}
      >
        <ModalHeader align="center" justify="space-between">
          <Flex align="center" gap={12} flex={1}>
            {icon && (
              <IconWrapper align="center" justify="center" $type={type}>
                {icon}
              </IconWrapper>
            )}
            <Flex direction="column" gap={4} flex={1}>
              <Text id="modal-title" variant="xlargeSemibold" color="textMain">
                {title}
              </Text>
              {description && (
                <Text variant="baseRegular" color="textMuted">
                  {description}
                </Text>
              )}
              {steps && <div style={{ marginTop: 16 }}>{steps}</div>}
            </Flex>
          </Flex>

          {showX && (
            <IconButton
              type="button"
              variant="ghost"
              onClick={onClose}
              icon={<X size={20} />}
              aria-label="Đóng"
            />
          )}
        </ModalHeader>

        <ModalBody>{children}</ModalBody>

        <ModalFooter justify="flex-end" align="center" gap={12}>
          {footer !== undefined ? (
            footer
          ) : (
            <>
              {extraFooterActions}
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                disabled={isLoading}
              >
                {cancelText}
              </Button>

              {type !== "info" && (
                <Button
                  type={isForm ? "submit" : "button"}
                  variant={type === "danger" ? "danger" : "primary"}
                  disabled={isLoading}
                  leftIcon={
                    isLoading ? (
                      <Loader2 className="animate-spin" size={18} />
                    ) : undefined
                  }
                  onClick={!isForm ? handleSubmit : undefined}
                >
                  {submitText}
                </Button>
              )}
            </>
          )}
        </ModalFooter>
      </ModalBox>
    </ModalOverlay>
  );

  // Dùng React Portal để đưa modal ra khỏi cấu trúc DOM hiện tại (tránh overflow: hidden, z-index bugs)
  return createPortal(modalContent, document.body);
};
