import type { useInteractions } from "@floating-ui/react";
import * as React from "react";

/**
 * Kiểu dữ liệu của một Option trong Select.
 */
export interface SelectOptionType {
  value: string;
  label: string;
  disabled?: boolean;
}

/**
 * Dữ liệu Context chia sẻ trạng thái giữa các component con của Select (Root, Trigger, Dropdown, Option).
 */
export interface SelectContextType {
  open: boolean;
  setOpen: (open: boolean) => void;
  activeIndex: number | null;
  setActiveIndex: React.Dispatch<React.SetStateAction<number | null>>;
  selectedIndex: number | null;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number | null>>;
  getItemProps: ReturnType<typeof useInteractions>["getItemProps"];
  activeIndexRef: React.MutableRefObject<number | null>;
  listRef: React.MutableRefObject<Array<HTMLElement | null>>;

  // Custom props
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
  multiple: boolean;
  options: SelectOptionType[];
}

const SelectContext = React.createContext<SelectContextType | null>(null);

export const useSelectContext = () => {
  const context = React.useContext(SelectContext);
  if (!context) {
    throw new Error("Select components must be wrapped in <SelectRoot />");
  }
  return context;
};

export const SelectProvider = SelectContext.Provider;
