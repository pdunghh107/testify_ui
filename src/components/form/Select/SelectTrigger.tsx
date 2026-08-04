import { ChevronDown, X } from "lucide-react";
import * as React from "react";
import styled from "styled-components";

import { useSelectContext } from "./SelectContext";

const TriggerButton = styled.button<{
  $isOpen: boolean;
  $hasError?: boolean;
  $isSm?: boolean;
}>`
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  user-select: none;

  display: flex;
  gap: 6px;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  min-width: 0;
  min-height: ${({ $isSm }) => ($isSm ? "32px" : "40px")};
  padding: ${({ $isSm }) => ($isSm ? "5px 8px 5px 10px" : "8px 10px 8px 12px")};
  border: 1px solid
    ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.borderDefault};
  border-radius: 6px;

  font-family: ${({ theme }) => theme.fonts.family.base};
  font-size: ${({ theme, $isSm }) => ($isSm ? "13px" : theme.fonts.size.base)};
  color: ${({ theme }) => theme.colors.textMain};
  text-align: left;
  white-space: nowrap;

  background: ${({ theme, disabled }) =>
    disabled ? theme.colors.backgroundHover : theme.colors.backgroundCard};
  outline: none;

  transition: all 0.2s ease-in-out;

  &:hover:not(:disabled) {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    background: ${({ theme }) => theme.colors.backgroundApp};
  }

  &:focus-visible,
  &[data-open="true"] {
    border-color: ${({ theme, $hasError }) =>
      $hasError ? theme.colors.danger : theme.colors.primary};
    box-shadow: 0 0 0 3px
      ${({ theme, $hasError }) =>
        $hasError ? theme.colors.dangerLight : theme.colors.primaryLight};
  }
`;

const ContentWrapper = styled.div`
  overflow: hidden;
  display: flex;
  flex: 1;
  align-items: center;

  min-width: 0;
`;

const LabelSpan = styled.span<{ $isPlaceholder?: boolean }>`
  overflow: hidden;
  display: block;
  flex: 1;

  min-width: 0;

  color: ${({ theme, $isPlaceholder }) =>
    $isPlaceholder ? theme.colors.textMuted : "inherit"};
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const ActionsWrapper = styled.div`
  display: flex;
  flex-shrink: 0;
  gap: 8px;
  align-items: center;
`;

const ClearButton = styled(X)`
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};
  transition: color 0.15s;

  &:hover {
    color: ${({ theme }) => theme.colors.danger};
  }
`;

const StyledChevron = styled(ChevronDown)<{ $isOpen: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? "rotate(180deg)" : "rotate(0deg)")};
  color: ${({ theme }) => theme.colors.textMuted};
  transition: transform 0.2s ease;
`;

/**
 * Cấu hình Props cho SelectTrigger.
 */
export interface SelectTriggerProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  placeholder?: string;
  isError?: boolean;
  size?: "sm" | "md";
  clearable?: boolean;
}

/**
 * Component Nút bấm (Trigger) để mở danh sách tuỳ chọn (Dropdown).
 * Tự động hiển thị giá trị đã chọn hoặc placeholder, hỗ trợ nút xóa (clear).
 * Phải đặt bên trong `<SelectRoot>`.
 *
 * @example
 * ```tsx
 * <SelectTrigger placeholder="Chọn quốc gia..." clearable />
 * ```
 */
export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  SelectTriggerProps
>(
  (
    {
      placeholder = "Chọn...",
      isError,
      size = "md",
      clearable = false,
      className,
      ...props
    },
    ref,
  ) => {
    const { open, value, multiple, options, onChange, setOpen } =
      useSelectContext();
    const isSm = size === "sm";

    // Compute display label
    let displayLabel = placeholder;
    let hasValue = false;
    let selectedCount: number;

    if (multiple && Array.isArray(value)) {
      hasValue = value.length > 0;
      selectedCount = value.length;
      if (hasValue) {
        if (selectedCount === 1) {
          const found = options.find((o) => o.value === value[0]);
          displayLabel = found ? found.label : placeholder;
        } else {
          displayLabel = `Đã chọn ${selectedCount} tùy chọn`;
        }
      }
    } else if (!multiple && value) {
      hasValue = true;
      const found = options.find((o) => o.value === value);
      displayLabel = found ? found.label : placeholder;
    }

    const handleClear = (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange(multiple ? [] : "");
      if (open) setOpen(false);
    };

    return (
      <TriggerButton
        ref={ref}
        type="button"
        $isOpen={open}
        $hasError={isError}
        $isSm={isSm}
        data-open={open}
        className={className}
        {...props}
      >
        <ContentWrapper>
          <LabelSpan $isPlaceholder={!hasValue}>{displayLabel}</LabelSpan>
        </ContentWrapper>
        <ActionsWrapper>
          {clearable && hasValue && !props.disabled && (
            <ClearButton size={14} onClick={handleClear} />
          )}
          <StyledChevron size={isSm ? 13 : 15} $isOpen={open} />
        </ActionsWrapper>
      </TriggerButton>
    );
  },
);

SelectTrigger.displayName = "SelectTrigger";
