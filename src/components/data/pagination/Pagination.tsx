"use client";
import styled from "styled-components";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";
import {
  SelectRoot,
  SelectTrigger,
  SelectDropdown,
  SelectOption,
} from "../../form/Select";

// --- Types ---
/**
 * Cấu hình Props cho component Pagination.
 */
export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  totalElements: number;
  pageSize: number;
  pageSizeOptions?: number[];
  onPageChange: (page: number) => void;
  onPageSizeChange: (size: number) => void;
  itemLabel?: string;
}

// --- Styled Components ---
const PaginationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: space-between;
  padding: 16px 4px;
  flex-wrap: wrap;
  border-top: 1px solid ${colors.borderLight};
  margin-top: 16px;
  font-family: ${fonts.family.base};

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 16px;
    padding: 16px 0;
  }
`;

const PaginationLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
`;

const PaginationRight = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    justify-content: center;
    width: 100%;
  }
  @media (max-width: 480px) {
    gap: 2px;
  }
`;

const PaginationInfo = styled.span`
  font-size: ${fonts.size.small};
  font-weight: ${fonts.weight.medium};
  color: ${colors.textMuted};
  white-space: nowrap;
`;

const PaginationDivider = styled.div`
  width: 1px;
  height: 16px;
  background: ${colors.borderLight};
  margin: 0 4px;
  @media (max-width: 768px) {
    display: none;
  }
`;

const PaginationSummary = styled.span`
  font-size: ${fonts.size.small};
  color: ${colors.textDisabled};
  margin-left: 6px;
  white-space: nowrap;
  @media (max-width: 768px) {
    display: none;
  }
`;

const PaginationPageBtn = styled.button<{ $active?: boolean }>`
  min-width: 32px;
  height: 32px;
  border: 1px solid
    ${({ $active }) => ($active ? colors.primary : colors.borderLight)};
  border-radius: 6px;
  background: ${({ $active }) =>
    $active ? colors.primary : colors.backgroundCard};
  color: ${({ $active }) => ($active ? colors.textInverse : colors.textMain)};
  font-size: ${fonts.size.small};
  font-weight: ${({ $active }) =>
    $active ? fonts.weight.bold : fonts.weight.regular};
  cursor: pointer;
  transition: all 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover:not(:disabled) {
    background: ${({ $active }) => (!$active ? colors.backgroundHover : "")};
    border-color: ${({ $active }) => (!$active ? colors.borderDefault : "")};
  }

  @media (max-width: 480px) {
    min-width: 28px;
    height: 28px;
    font-size: 11px;
  }
`;

const PaginationNavBtn = styled.button`
  width: 32px;
  height: 32px;
  border: 1px solid ${colors.borderLight};
  border-radius: 6px;
  background: ${colors.backgroundCard};
  color: ${colors.textMain};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;

  &:hover:not(:disabled) {
    background: ${colors.backgroundHover};
    border-color: ${colors.borderDefault};
  }

  &:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  @media (max-width: 480px) {
    width: 28px;
    height: 28px;
  }
`;

const PaginationDots = styled.span`
  font-size: ${fonts.size.small};
  color: ${colors.textDisabled};
  padding: 0 2px;
  user-select: none;
`;

// --- Logic Helpers ---
function buildPages(current: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const pages: (number | "…")[] = [];
  const addPage = (p: number) => {
    if (pages[pages.length - 1] !== p) pages.push(p);
  };

  addPage(1);
  if (current > 4) pages.push("…");

  for (
    let i = Math.max(2, current - 2);
    i <= Math.min(total - 1, current + 2);
    i++
  ) {
    addPage(i);
  }

  if (current < total - 3) pages.push("…");
  addPage(total);

  return pages;
}

/**
 * Component Pagination hỗ trợ phân trang cho danh sách/bảng dữ liệu.
 * Đi kèm với tính năng chọn số lượng hiển thị mỗi trang (Page Size).
 *
 * @example
 * ```tsx
 * <Pagination 
 *   currentPage={1} 
 *   totalPages={10} 
 *   totalElements={100} 
 *   pageSize={10} 
 *   onPageChange={(page) => fetchPage(page)} 
 *   onPageSizeChange={(size) => setPageSize(size)} 
 * />
 * ```
 */
export function Pagination({
  currentPage,
  totalPages,
  totalElements,
  pageSize,
  pageSizeOptions = [10, 20, 50],
  onPageChange,
  onPageSizeChange,
  itemLabel,
}: PaginationProps) {
  const label = itemLabel ?? "kết quả";

  if (totalPages <= 0) return null;

  const from = totalElements === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const to = Math.min(currentPage * pageSize, totalElements);
  const pages = buildPages(currentPage, totalPages);

  return (
    <PaginationWrapper>
      <PaginationLeft>
        <PaginationInfo>
          {totalElements > 0 ? (
            <>
              {from}
              {"-"}
              {to} / <strong>{totalElements}</strong> {label}
            </>
          ) : (
            <>0 {label}</>
          )}
        </PaginationInfo>

        <PaginationDivider />
        <PaginationInfo>Hiển thị</PaginationInfo>

        <div style={{ minWidth: 110 }}>
          <SelectRoot
            value={pageSize.toString()}
            onChange={(val) => onPageSizeChange(Number(val))}
            options={pageSizeOptions.map((s) => ({
              value: s.toString(),
              label: `${s} / trang`,
            }))}
          >
            <SelectTrigger size="sm" />
            <SelectDropdown>
              {pageSizeOptions.map((s, idx) => (
                <SelectOption key={s} value={s.toString()} index={idx}>
                  {s} / trang
                </SelectOption>
              ))}
            </SelectDropdown>
          </SelectRoot>
        </div>
      </PaginationLeft>

      <PaginationRight>
        <PaginationNavBtn
          disabled={currentPage <= 1}
          onClick={() => onPageChange(currentPage - 1)}
          aria-label="Trang trước"
        >
          <ChevronLeft size={14} />
        </PaginationNavBtn>

        {pages.map((p, idx) =>
          p === "…" ? (
            <PaginationDots key={`dot-${idx}`}>…</PaginationDots>
          ) : (
            <PaginationPageBtn
              key={p}
              $active={p === currentPage}
              onClick={() => onPageChange(p as number)}
              aria-label={`Trang ${p as number}`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p as number}
            </PaginationPageBtn>
          ),
        )}

        <PaginationNavBtn
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          aria-label="Trang sau"
        >
          <ChevronRight size={14} />
        </PaginationNavBtn>

        <PaginationSummary>
          Trang <strong>{currentPage}</strong> / {totalPages}
        </PaginationSummary>
      </PaginationRight>
    </PaginationWrapper>
  );
}
