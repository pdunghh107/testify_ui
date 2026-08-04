import { FloatingPortal } from "@floating-ui/react";
import { Search, X } from "lucide-react";
import * as React from "react";
import styled from "styled-components";

import { useSelectContext } from "./SelectContext";

const DropdownContainer = styled.div`
  z-index: 9999;

  overflow: hidden;
  display: flex;
  flex-direction: column;

  width: 100%;
  max-height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 8px;

  background: ${({ theme }) => theme.colors.backgroundCard};
  box-shadow:
    0 8px 24px rgb(0 0 0 / 10%),
    0 2px 8px rgb(0 0 0 / 6%);
`;

const SearchWrapper = styled.div`
  position: relative;
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const SearchIcon = styled(Search)`
  pointer-events: none;

  position: absolute;
  top: 50%;
  left: 16px;
  transform: translateY(-50%);

  color: ${({ theme }) => theme.colors.textMuted};
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  padding: 6px 28px 6px 30px;
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: 6px;

  font-family: inherit;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMain};

  background: ${({ theme }) => theme.colors.backgroundApp};
  outline: none;

  transition: all 0.15s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const SearchClear = styled.button`
  cursor: pointer;

  position: absolute;
  top: 50%;
  right: 16px;
  transform: translateY(-50%);

  display: flex;
  align-items: center;

  padding: 2px;
  border: none;
  border-radius: 3px;

  color: ${({ theme }) => theme.colors.textMuted};

  background: none;

  &:hover {
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

const List = styled.ul`
  overflow-y: auto;
  flex: 1;

  margin: 0;
  padding: 4px;

  list-style: none;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: ${({ theme }) => theme.colors.borderDefault};
  }
`;

const NoResult = styled.li`
  padding: 12px 14px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

/**
 * Cấu hình Props cho SelectDropdown.
 */
export interface SelectDropdownProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  searchable?: boolean;
  searchPlaceholder?: string;
  onSearchApi?: (query: string) => void;
  query?: string;
  setQuery?: (q: string) => void;
  isMounted?: boolean;
  floatingStyles?: React.CSSProperties;
  transitionStyles?: React.CSSProperties;
}

/**
 * Component Danh sách nổi (Dropdown) chứa các tuỳ chọn của Select.
 * Có thể bật tính năng ô tìm kiếm (searchable). 
 * Sử dụng FloatingPortal để không bị giới hạn bởi overflow của thẻ cha.
 * Phải đặt bên trong `<SelectRoot>`.
 *
 * @example
 * ```tsx
 * <SelectDropdown searchable searchPlaceholder="Tìm...">
 *   {options.map(...)}
 * </SelectDropdown>
 * ```
 */
export const SelectDropdown = React.forwardRef<
  HTMLDivElement,
  SelectDropdownProps
>(
  (
    {
      children,
      searchable = false,
      searchPlaceholder = "Tìm kiếm...",
      onSearchApi,
      query = "",
      setQuery,
      style,
      isMounted = false,
      floatingStyles,
      transitionStyles,
      ...props
    },
    ref,
  ) => {
    const { open } = useSelectContext();
    const searchRef = React.useRef<HTMLInputElement>(null);

    // Autofocus search input when dropdown opens
    React.useEffect(() => {
      if (open && searchable && searchRef.current) {
        // Small delay to allow portal to mount
        const timer = setTimeout(() => searchRef.current?.focus(), 50);
        return () => clearTimeout(timer);
      }
    }, [open, searchable]);

    // Sử dụng isMounted thay vì open để đảm bảo hiệu ứng out animation chạy xong mới unmount
    if (!isMounted) return null;

    return (
      <FloatingPortal>
        <div
          ref={ref}
          style={{
            ...floatingStyles,
            zIndex: 9999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <DropdownContainer
            style={{ ...style, ...transitionStyles }}
            {...props}
          >
            {searchable && (
              <SearchWrapper>
                <SearchIcon size={14} />
                <SearchInput
                  ref={searchRef}
                  type="text"
                  value={query}
                  placeholder={searchPlaceholder}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (setQuery) setQuery(val);
                    if (onSearchApi) onSearchApi(val);
                  }}
                  onKeyDown={(e) => {
                    // Prevent typing from interfering with standard shortcuts, but allow arrows to list navigation
                    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
                      e.preventDefault(); // handled by useListNavigation
                    }
                  }}
                />
                {query && (
                  <SearchClear
                    type="button"
                    onMouseDown={(e) => {
                      e.preventDefault();
                      if (setQuery) setQuery("");
                      if (onSearchApi) onSearchApi("");
                    }}
                  >
                    <X size={12} />
                  </SearchClear>
                )}
              </SearchWrapper>
            )}
            <List>
              {React.Children.count(children) === 0 ? (
                <NoResult>Không có kết quả</NoResult>
              ) : (
                children
              )}
            </List>
          </DropdownContainer>
        </div>
      </FloatingPortal>
    );
  },
);

SelectDropdown.displayName = "SelectDropdown";
