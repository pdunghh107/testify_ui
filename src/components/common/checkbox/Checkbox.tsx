import React, { forwardRef, useEffect, useRef } from "react";
import { Check, Minus } from "lucide-react";
import {
  CheckboxContainer,
  HiddenInput,
  StyledBox,
  IconWrapper,
  LabelText,
} from "./Checkbox.styles";

/**
 * Cấu hình Props cho component Checkbox.
 */
export interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  label?: string;
  checked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  variant?: "default" | "success";
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * Component Checkbox tùy chỉnh giao diện (Custom Checkbox).
 * Hỗ trợ trạng thái Checked, Unchecked và Indeterminate (bán chọn).
 *
 * @example
 * ```tsx
 * const [isChecked, setIsChecked] = useState(false);
 * 
 * <Checkbox 
 *   label="Đồng ý với điều khoản" 
 *   checked={isChecked} 
 *   onChange={(e) => setIsChecked(e.target.checked)} 
 * />
 * ```
 */
export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  (
    {
      label,
      checked = false,
      indeterminate = false,
      disabled = false,
      readOnly = false,
      variant = "default",
      onChange,
      ...props
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Xử lý indeterminate qua DOM property
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.indeterminate = indeterminate;
      }
    }, [indeterminate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (disabled || readOnly) return;
      onChange?.(e);
    };

    return (
      <CheckboxContainer $disabled={disabled}>
        <HiddenInput
          type="checkbox"
          ref={(node) => {
            // Merge refs
            inputRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) (ref as React.MutableRefObject<HTMLInputElement | null>).current = node;
          }}
          checked={checked}
          disabled={disabled || readOnly}
          onChange={handleChange}
          aria-checked={indeterminate ? "mixed" : checked}
          {...props}
        />
        <StyledBox $checked={checked} $indeterminate={indeterminate} $variant={variant} $disabled={disabled || readOnly}>
          {indeterminate ? (
            <IconWrapper>
              <Minus size={14} strokeWidth={4} />
            </IconWrapper>
          ) : checked ? (
            <IconWrapper>
              <Check size={14} strokeWidth={4} />
            </IconWrapper>
          ) : null}
        </StyledBox>

        {label && <LabelText>{label}</LabelText>}
      </CheckboxContainer>
    );
  },
);

Checkbox.displayName = "Checkbox";
