import React, { useState } from "react";
import styled from "styled-components";
import { Checkbox } from "../../common/checkbox/Checkbox";
import { Package, ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
import { getCellValue, renderCellContent } from "./CellRenderers";
import type {
  DataTableProps,
  DataTableRowProps,
  DataTableColumn,
} from "./types";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";
import { Skeleton } from "../../overlay/loading/skeleton";

export const TableWrapper = styled.div<{ $maxHeight?: number | string }>`
  overflow: auto;
  height: 100%;
  border-radius: 12px;
  border: 1px solid ${colors.borderLight};
  background: ${colors.backgroundCard};
  font-family: ${fonts.family.base};

  th {
    position: sticky;
    top: 0;
    z-index: 10;
    box-shadow: 0 1px 0 ${colors.borderLight};
  }

  ${({ $maxHeight }) =>
    $maxHeight &&
    `
    max-height: ${typeof $maxHeight === "number" ? `${$maxHeight}px` : $maxHeight};
  `}
`;

export const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    padding: 12px 16px;
    font-size: ${fonts.size.small};
    font-weight: ${fonts.weight.semibold};
    color: ${colors.textMuted};
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: ${colors.backgroundApp};
    border-bottom: 1px solid ${colors.borderLight};
    white-space: nowrap;
  }

  td {
    padding: 12px 16px;
    border-bottom: 1px solid ${colors.borderLight};
    color: ${colors.textMain};
  }

  tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background: ${colors.backgroundHover};
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 80px 24px;
  color: ${colors.textDisabled};

  p {
    font-size: ${fonts.size.base};
    font-weight: ${fonts.weight.medium};
    margin: 0;
  }
`;

export const FlexHeader = styled.div<{ $align?: "left" | "center" | "right" }>`
  display: flex;
  align-items: center;
  gap: 6px;
  justify-content: ${({ $align }) =>
    $align === "center"
      ? "center"
      : $align === "right"
        ? "flex-end"
        : "flex-start"};
`;

export const EmptyData = ({ text }: { text?: string }) => (
  <EmptyStateContainer>
    <Package size={40} style={{ opacity: "0.4" }} />
    <p>{text}</p>
  </EmptyStateContainer>
);

/**
 * Component DataTable dùng để hiển thị dữ liệu dạng bảng có tích hợp sẵn:
 * - Sorting,
 * - Checkbox (chọn nhiều row),
 * - Custom Rendering từng ô,
 * - Empty State và Loading State.
 *
 * @example
 * ```tsx
 * const columns = [
 *   { header: 'Tên', value: 'name', sortable: true },
 *   { header: 'Hành động', type: 'action', actions: [...] }
 * ];
 * 
 * <DataTable 
 *   data={list} 
 *   columns={columns} 
 *   rowKey="id" 
 *   selectable={true} 
 * />
 * ```
 */
export function DataTable<T>({
  columns,
  data = [],
  rowKey,
  loading = false,
  emptyText = "Không có dữ liệu",
  onRowClick,
  className,
  style,
  maxHeight,
  sortState,
  onSort,
  selectable = false,
  onSelectionChange,
}: DataTableProps<T>) {
  const getKey = (row: T) =>
    typeof rowKey === "function" ? rowKey(row) : String(row[rowKey as keyof T]);

  // Bulk Selection State
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]);

  const handleSelectAll = (checked: boolean) => {
    const keys = checked ? data.map(getKey) : [];
    setSelectedKeys(keys);
    onSelectionChange?.(keys);
  };

  const handleSelectRow = (key: string, checked: boolean) => {
    const newKeys = checked
      ? [...selectedKeys, key]
      : selectedKeys.filter((k) => k !== key);
    setSelectedKeys(newKeys);
    onSelectionChange?.(newKeys);
  };

  const isAllSelected = data.length > 0 && selectedKeys.length === data.length;
  const isIndeterminate =
    selectedKeys.length > 0 && selectedKeys.length < data.length;

  return (
    <TableWrapper $maxHeight={maxHeight} className={className} style={style}>
      <StyledTable>
        <thead>
          <tr>
            {selectable && (
              <th style={{ width: 48, minWidth: 48, paddingLeft: 24 }}>
                <Checkbox
                  checked={isAllSelected}
                  indeterminate={isIndeterminate}
                  onChange={(e) =>
                    handleSelectAll((e.target as HTMLInputElement).checked)
                  }
                />
              </th>
            )}
            {columns.map((col, i) => {
              const sortKey = col.sortKey || col.value;
              const isSorted = sortState && sortState.key === sortKey;
              const canSort = !!col.sortable && !!onSort && !!sortKey;

              return (
                <th
                  key={i}
                  style={{
                    textAlign: col.align || "left",
                    minWidth: col.minWidth || 180,
                    cursor: canSort ? "pointer" : "default",
                    userSelect: canSort ? "none" : "auto",
                  }}
                  onClick={() => {
                    if (!canSort || !onSort || !sortState) return;
                    const nextDir =
                      isSorted && sortState.direction === "asc"
                        ? "desc"
                        : "asc";
                    onSort(sortKey as string, nextDir);
                  }}
                >
                  <FlexHeader $align={col.align}>
                    {col.header}
                    {canSort && (
                      <span
                        style={{
                          color: isSorted
                            ? colors.primary
                            : colors.textDisabled,
                        }}
                      >
                        {isSorted ? (
                          sortState!.direction === "asc" ? (
                            <ArrowUp size={14} />
                          ) : (
                            <ArrowDown size={14} />
                          )
                        ) : (
                          <ChevronsUpDown size={14} />
                        )}
                      </span>
                    )}
                  </FlexHeader>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {loading ? (
            Array.from({ length: 5 }).map((_, ri) => (
              <tr key={ri}>
                {columns.map((_, ci) => (
                  <td key={ci}>
                    <Skeleton
                      variant="text"
                      width="75%"
                      height={14}
                      style={{ marginBottom: 0 }}
                    />
                  </td>
                ))}
              </tr>
            ))
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} style={{ padding: 0 }}>
                <EmptyData text={emptyText} />
              </td>
            </tr>
          ) : (
            data.map((row, ri) => {
              const key = getKey(row);
              return (
                <DataTableRow
                  key={key}
                  row={row}
                  rowIndex={ri}
                  columns={columns}
                  onRowClick={onRowClick}
                  selectable={selectable}
                  isSelected={selectedKeys.includes(key)}
                  onSelectChange={(checked) => handleSelectRow(key, checked)}
                />
              );
            })
          )}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
}

const DataTableRow = <T,>({
  row,
  rowIndex,
  columns,
  onRowClick,
  selectable,
  isSelected,
  onSelectChange,
}: DataTableRowProps<T>) => {
  return (
    <tr
      onClick={() => onRowClick?.(row)}
      style={{
        cursor: onRowClick ? "pointer" : "default",
        background: isSelected ? "var(--brand-50)" : "transparent",
      }}
    >
      {selectable && (
        <td
          onClick={(e) => {
            e.stopPropagation();
            onSelectChange?.(!isSelected);
          }}
          style={{
            width: 48,
            minWidth: 48,
            paddingLeft: 24,
            cursor: "pointer",
          }}
        >
          <Checkbox checked={isSelected} readOnly />
        </td>
      )}
      {columns.map((col: DataTableColumn<T>, ci: number) => {
        if (col.render) {
          return (
            <td key={ci} style={{ textAlign: col.align || "left" }}>
              {col.render(row, rowIndex)}
            </td>
          );
        }

        const value = getCellValue(row, col.value);
        const isEmpty = value === null || value === undefined || value === "";

        if (
          isEmpty &&
          col.type !== "action" &&
          col.type !== "boolean" &&
          col.type !== "avatar"
        ) {
          return (
            <td
              key={ci}
              style={{
                textAlign: col.align || "left",
                color: colors.textMuted,
                ...fonts.variants.baseMedium,
              }}
            >
              ---
            </td>
          );
        }

        let content: React.ReactNode = renderCellContent(col, row, value);

        const isWrap = col.wrap === true;
        return (
          <td
            key={ci}
            style={{
              textAlign: col.align || "left",
              maxWidth: col.maxWidth,
              ...(col.maxWidth && !isWrap
                ? {
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }
                : {}),
              ...(isWrap
                ? { whiteSpace: "normal", wordWrap: "break-word" }
                : {}),
            }}
            onClick={
              col.onClick
                ? (e) => {
                    e.stopPropagation();
                    col.onClick!(row, rowIndex);
                  }
                : undefined
            }
          >
            {content}
          </td>
        );
      })}
    </tr>
  );
};
