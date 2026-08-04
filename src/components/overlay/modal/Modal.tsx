"use client";

import { FocusTrap } from "focus-trap-react";
import { Loader2, X } from "lucide-react";
import React from "react";
import { createPortal } from "react-dom";
import { RemoveScroll } from "react-remove-scroll";

import { Button, IconButton } from "@/components/common/button/Button";
import { Text } from "@/components/common/text/Text";
import { Flex } from "@/components/layout/flex/Flex";
import { useOnEscape } from "@/hooks/useOnEscape";
import { useOverlayClick } from "@/hooks/useOverlayClick";

import {
  IconWrapper,
  ModalBody,
  ModalBox,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
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
  onConfirm?: (e?: React.SyntheticEvent) => void;
  isLoading?: boolean;
  type?: "default" | "danger" | "info";
  maxWidth?: string;
  showX?: boolean;
  steps?: React.ReactNode;
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
  onConfirm,
  isLoading = false,
  type = "default",
  maxWidth = "500px",
  showX = true,
  steps,
}: ModalProps) => {
  const overlayHandlers = useOverlayClick(onClose);

  // 1. Hook tái sử dụng chống Drag-click
  useOnEscape(onClose, isOpen);

  if (!isOpen) return null;

  // 3. Xử lý sự kiện confirm (tách biệt hoàn toàn khỏi HTML form)
  const handleConfirm = (e?: React.SyntheticEvent) => {
    if (e) e.preventDefault();
    if (onConfirm && !isLoading) onConfirm(e);
  };

  const modalContent = (
    <FocusTrap focusTrapOptions={{ fallbackFocus: "#modal-title" }}>
      <RemoveScroll>
        <ModalOverlay
          {...overlayHandlers}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <ModalBox
            style={{ maxWidth }}
            // Ngăn chặn click vào trong modal bị lan ra overlay
            onMouseDown={(e: React.MouseEvent) => e.stopPropagation()}
            onMouseUp={(e: React.MouseEvent) => e.stopPropagation()}
            tabIndex={-1}
          >
            <ModalHeader align="center" justify="space-between">
              <Flex align="center" gap={12} flex={1}>
                {icon && (
                  <IconWrapper align="center" justify="center" $type={type}>
                    {icon}
                  </IconWrapper>
                )}
                <Flex direction="column" gap={4} flex={1}>
                  <Text
                    id="modal-title"
                    variant="xlargeSemibold"
                    color="textMain"
                    tabIndex={-1}
                  >
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
                      type="button"
                      variant={type === "danger" ? "danger" : "primary"}
                      disabled={isLoading}
                      leftIcon={
                        isLoading ? (
                          <Loader2 className="animate-spin" size={18} />
                        ) : undefined
                      }
                      onClick={handleConfirm}
                    >
                      {submitText}
                    </Button>
                  )}
                </>
              )}
            </ModalFooter>
          </ModalBox>
        </ModalOverlay>
      </RemoveScroll>
    </FocusTrap>
  );

  // Dùng React Portal để đưa modal ra khỏi cấu trúc DOM hiện tại
  return createPortal(modalContent, document.body);
};
