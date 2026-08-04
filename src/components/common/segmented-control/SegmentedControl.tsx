import React, { useEffect, useRef, useState } from "react";

import {
  SegmentedButton,
  SegmentedIndicator,
  SegmentedRoot,
} from "./SegmentedControl.styles";

/**
 * Cấu hình tuỳ chọn cho SegmentedControl.
 */
export interface SegmentedOption {
  label: React.ReactNode;
  value: string;
  disabled?: boolean;
}

/**
 * Cấu hình Props cho component SegmentedControl.
 */
export interface SegmentedControlProps {
  options: SegmentedOption[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  id?: string;
}

/**
 * Component SegmentedControl hiển thị một tập hợp các nút chuyển đổi ngang (giống tabs hoặc radio group).
 * Hỗ trợ hiệu ứng trượt mượt mà (sliding indicator) khi thay đổi lựa chọn.
 *
 * @example
 * ```tsx
 * const options = [
 *   { label: 'Ngày', value: 'day' },
 *   { label: 'Tháng', value: 'month' },
 * ];
 * const [view, setView] = useState('day');
 *
 * <SegmentedControl options={options} value={view} onChange={setView} />
 * ```
 */
export const SegmentedControl: React.FC<SegmentedControlProps> = ({
  options,
  value,
  onChange,
  className,
  id,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState({ width: 0, left: 0 });
  const [isReady, setIsReady] = useState(false);

  const updateIndicator = () => {
    if (!rootRef.current) return;

    // Find the button element that corresponds to the active value
    const activeIndex = options.findIndex((opt) => opt.value === value);
    if (activeIndex === -1) return;

    // We skip the Indicator (which is the first child in the DOM if we placed it there)
    // Or we can just use querySelectorAll for the buttons
    const buttons = rootRef.current.querySelectorAll("button[role='radio']");
    const activeButton = buttons[activeIndex] as HTMLButtonElement | undefined;

    if (activeButton) {
      setIndicatorStyle({
        width: activeButton.offsetWidth,
        left: activeButton.offsetLeft,
      });
      // Set ready to true after first calculation so we can fade it in
      // preventing animation from left 0 on mount
      if (!isReady) {
        requestAnimationFrame(() => {
          setIsReady(true);
        });
      }
    }
  };

  useEffect(() => {
    updateIndicator();

    // Also update on window resize
    window.addEventListener("resize", updateIndicator);
    return () => {
      window.removeEventListener("resize", updateIndicator);
    };
  }, [value, options]);

  // If fonts load later, it might affect width
  useEffect(() => {
    if (document.fonts) {
      document.fonts.ready.then(() => {
        updateIndicator();
      });
    }
  }, []);

  return (
    <SegmentedRoot
      ref={rootRef}
      className={className}
      id={id}
      role="radiogroup"
    >
      <SegmentedIndicator
        $width={indicatorStyle.width}
        $left={indicatorStyle.left}
        $isVisible={isReady}
      />
      {options.map((opt) => (
        <SegmentedButton
          key={opt.value}
          type="button"
          role="radio"
          aria-checked={value === opt.value}
          $isActive={value === opt.value}
          disabled={opt.disabled}
          onClick={() => {
            if (!opt.disabled && value !== opt.value) {
              onChange(opt.value);
            }
          }}
        >
          {opt.label}
        </SegmentedButton>
      ))}
    </SegmentedRoot>
  );
};
