import type { ReactNode, ElementType } from "react";
import type { BadgeVariant } from "../../common/badge";
// --- Pagination & Sorting ---
export interface SortState {
  key: string;
  direction: "asc" | "desc";
}

// --- Cell Actions ---
export interface DataTableRowAction<T> {
  id: string;
  label: string;
  icon?: any;
  variant?: "default" | "danger";
  onClick: (row: T) => void;
  show?: (row: T) => boolean;
}

// --- Columns (Discriminated Unions) ---
export interface BaseColumn<T> {
  header: string;
  align?: "left" | "center" | "right";
  minWidth?: number | string;
  maxWidth?: number | string;
  wrap?: boolean;
  className?: string;
  value?: keyof T | string | ((row: T) => unknown);
  render?: (row: T, index: number) => ReactNode; // Custom render overrides everything
  onClick?: (row: T, index: number) => void;

  // Sorting props
  sortable?: boolean;
  sortKey?: string;
}

export interface AvatarColumn<T> extends BaseColumn<T> {
  type: "avatar";
  subtitle?: (row: T) => string;
  avatarKey?: (row: T) => string;
  avatarIcon?: (row: T) => ElementType;
  avatarBg?: (row: T) => string;
  avatarColor?: (row: T) => string;
  config?: Record<string, any>;
  onNavigate?: (row: T) => void;
}

export type BadgeConfig = Record<
  string | number,
  { label: string; variant: BadgeVariant }
>;

export interface BadgeColumn<T> extends BaseColumn<T> {
  type: "badge";
  badgeConfig?: BadgeConfig;
}

export interface ActionColumn<T> extends BaseColumn<T> {
  type: "action";
  actions: DataTableRowAction<T>[];
}

export interface DateColumn<T> extends BaseColumn<T> {
  type: "date";
}
export interface TimeColumn<T> extends BaseColumn<T> {
  type: "time";
}
export interface CurrencyColumn<T> extends BaseColumn<T> {
  type: "currency";
}
export interface PercentColumn<T> extends BaseColumn<T> {
  type: "percent";
}
export interface BooleanColumn<T> extends BaseColumn<T> {
  type: "boolean";
}
export interface CheckboxColumn<T> extends BaseColumn<T> {
  type: "checkbox";
  readOnly?: boolean;
  onCheckboxChange?: (row: T, checked: boolean) => void;
}
export interface DefaultColumn<T> extends BaseColumn<T> {
  type?: "default";
}

export type DataTableColumn<T> =
  | AvatarColumn<T>
  | BadgeColumn<T>
  | ActionColumn<T>
  | DateColumn<T>
  | TimeColumn<T>
  | CurrencyColumn<T>
  | PercentColumn<T>
  | BooleanColumn<T>
  | CheckboxColumn<T>
  | DefaultColumn<T>;

// --- Table Props ---
export interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: keyof T | ((row: T) => string);
  loading?: boolean;
  emptyText?: string;
  onRowClick?: (row: T) => void;
  className?: string;
  style?: React.CSSProperties;
  maxHeight?: number | string;

  // Sorting
  sortState?: SortState;
  onSort?: (key: string, direction: "asc" | "desc") => void;

  // Selection
  selectable?: boolean;
  onSelectionChange?: (selectedKeys: string[]) => void;
}

export interface DataTableRowProps<T> {
  row: T;
  rowIndex: number;
  columns: DataTableColumn<T>[];
  onRowClick?: (row: T) => void;
  selectable?: boolean;
  isSelected?: boolean;
  onSelectChange?: (selected: boolean) => void;
}
