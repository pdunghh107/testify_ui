import { type ReactNode, useMemo, useState } from "react";
import { useController, useFormContext } from "react-hook-form";
import styled from "styled-components";

import { RequiredAsterisk } from "./RequiredAsterisk";
import {
  SelectDropdown,
  SelectOption,
  type SelectOptionType,
  SelectRoot,
  SelectTrigger,
} from "./Select";

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-size: ${({ theme }) => theme.fonts.size.small};
  font-weight: ${({ theme }) => theme.fonts.weight.medium};
  color: ${({ theme }) => theme.colors.textMain};
  margin-bottom: 6px;
`;

const HelperMessage = styled.p<{ $isError?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.family.base};
  font-size: ${({ theme }) => theme.fonts.size.small};
  color: ${({ theme, $isError }) =>
    $isError ? theme.colors.danger : theme.colors.textMuted};
  margin-top: 4px;
`;

const HighlightMark = styled.mark`
  background: ${({ theme }) => theme.colors.warningLight || "#fef08a"};
  color: ${({ theme }) => theme.colors.textMain};
  border-radius: 2px;
  padding: 0 1px;
`;

const highlightMatch = (label: string, query: string) => {
  if (!query) return label;

  const idx = label.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return label;

  return (
    <>
      {label.slice(0, idx)}
      <HighlightMark>{label.slice(idx, idx + query.length)}</HighlightMark>
      {label.slice(idx + query.length)}
    </>
  );
};

export interface RHFSelectFieldProps {
  name: string; // Mandatory for RHF
  label?: string | ReactNode;
  required?: boolean;
  helperText?: ReactNode;
  containerClassName?: string;
  className?: string;

  options: SelectOptionType[];
  placeholder?: string;
  multiple?: boolean;
  disabled?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearchApi?: (query: string) => void;
  clearable?: boolean;
  size?: "sm" | "md";
}

export function SelectField({
  name,
  label,
  required,
  helperText,
  containerClassName,
  className,
  options,
  placeholder,
  multiple = false,
  disabled = false,
  searchable = false,
  searchPlaceholder,
  onSearchApi,
  clearable,
  size,
}: RHFSelectFieldProps) {
  const { control } = useFormContext();
  const { field, fieldState } = useController({ name, control });

  const errorMessage = fieldState.error?.message;

  // Local search query state if search is enabled
  const [query, setQuery] = useState("");

  const filteredOptions = useMemo(() => {
    if (!searchable || !query.trim() || onSearchApi) return options;
    return options.filter((o) =>
      o.label.toLowerCase().includes(query.toLowerCase()),
    );
  }, [options, searchable, query, onSearchApi]);

  return (
    <InputContainer className={containerClassName}>
      {label && (
        <Label htmlFor={name}>
          {label}
          {required && <RequiredAsterisk />}
        </Label>
      )}

      <SelectRoot
        value={field.value}
        onChange={field.onChange}
        multiple={multiple}
        options={options}
        disabled={disabled}
      >
        <SelectTrigger
          placeholder={placeholder}
          isError={!!errorMessage}
          size={size}
          clearable={clearable}
          className={className}
          id={name}
        />
        <SelectDropdown
          searchable={searchable}
          searchPlaceholder={searchPlaceholder}
          query={query}
          setQuery={setQuery}
          onSearchApi={onSearchApi}
        >
          {filteredOptions.map((opt, index) => (
            <SelectOption
              key={opt.value}
              value={opt.value}
              index={index}
              disabled={opt.disabled}
            >
              {highlightMatch(opt.label, query)}
            </SelectOption>
          ))}
        </SelectDropdown>
      </SelectRoot>

      {errorMessage ? (
        <HelperMessage $isError>{errorMessage}</HelperMessage>
      ) : helperText ? (
        <HelperMessage>{helperText}</HelperMessage>
      ) : null}
    </InputContainer>
  );
}
