import { Check } from "lucide-react";
import * as React from "react";
import styled from "styled-components";

import { useSelectContext } from "./SelectContext";

const OptionLi = styled.li<{
  $active: boolean;
  $selected: boolean;
  $disabled: boolean;
}>`
  cursor: ${({ $disabled }) => ($disabled ? "not-allowed" : "pointer")};

  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: space-between;

  padding: 8px 10px;
  border-radius: 6px;

  font-size: 13.5px;
  color: ${({ theme, $disabled }) =>
    $disabled ? theme.colors.textDisabled : theme.colors.textMain};

  background: ${({ theme, $active, $selected }) =>
    $active
      ? theme.colors.backgroundHover
      : $selected
        ? theme.colors.primaryLight
        : "transparent"};
  outline: none;

  &:hover {
    background: ${({ theme, $disabled }) =>
      $disabled ? "transparent" : theme.colors.backgroundHover};
  }
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  gap: 10px;
  align-items: center;
`;

const CheckboxBox = styled.div<{ $checked: boolean }>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 16px;
  height: 16px;
  border: 1.5px solid
    ${({ theme, $checked }) =>
      $checked ? theme.colors.primary : theme.colors.borderDefault};
  border-radius: 4px;

  color: white;

  background: ${({ theme, $checked }) =>
    $checked ? theme.colors.primary : theme.colors.backgroundCard};

  transition: all 0.15s;
`;

const OptionLabel = styled.span`
  overflow: hidden;
  flex: 1;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export interface SelectOptionProps extends React.LiHTMLAttributes<HTMLLIElement> {
  value: string;
  disabled?: boolean;
  index: number;
}

export const SelectOption = React.forwardRef<HTMLLIElement, SelectOptionProps>(
  ({ value, children, disabled = false, index, ...props }, ref) => {
    const {
      activeIndex,
      getItemProps,
      listRef,
      value: contextValue,
      onChange,
      multiple,
      setOpen,
    } = useSelectContext();

    const isActive = activeIndex === index;

    // Check if this option is selected
    const isSelected = React.useMemo(() => {
      if (multiple && Array.isArray(contextValue)) {
        return contextValue.includes(value);
      }
      return contextValue === value;
    }, [multiple, contextValue, value]);

    // Update list refs for useListNavigation
    const internalRef = React.useRef<HTMLLIElement | null>(null);
    React.useImperativeHandle(ref, () => internalRef.current as HTMLLIElement);

    const handleSelect = () => {
      if (disabled) return;
      if (multiple) {
        const currentVals = (contextValue as string[]) || [];
        if (isSelected) {
          onChange(currentVals.filter((v) => v !== value));
        } else {
          onChange([...currentVals, value]);
        }
      } else {
        onChange(value);
        setOpen(false);
      }
    };

    return (
      <OptionLi
        ref={(node) => {
          internalRef.current = node;
          listRef.current[index] = node;
        }}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        $active={isActive}
        $selected={isSelected}
        $disabled={disabled}
        {...getItemProps({
          onClick: handleSelect,
          onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              handleSelect();
            }
          },
        })}
        {...props}
      >
        <ContentWrapper>
          {multiple && (
            <CheckboxBox $checked={isSelected}>
              {isSelected && <Check size={12} strokeWidth={3} />}
            </CheckboxBox>
          )}
          <OptionLabel>{children}</OptionLabel>
        </ContentWrapper>
        {!multiple && isSelected && <Check size={14} color="var(--primary)" />}
      </OptionLi>
    );
  },
);

SelectOption.displayName = "SelectOption";
