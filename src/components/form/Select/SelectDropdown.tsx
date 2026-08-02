import * as React from "react";
import styled from "styled-components";
import { FloatingPortal } from "@floating-ui/react";
import { useSelectContext } from "./SelectContext";
import { Search, X } from "lucide-react";

const DropdownContainer = styled.div`
  background: ${({ theme }) => theme.colors.backgroundCard};
  border: 1px solid ${({ theme }) => theme.colors.borderLight};
  border-radius: 8px;
  box-shadow:
    0 8px 24px rgba(0, 0, 0, 0.1),
    0 2px 8px rgba(0, 0, 0, 0.06);
  overflow: hidden;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  max-height: 100%;
  width: 100%;
`;

const SearchWrapper = styled.div`
  position: relative;
  padding: 8px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderLight};
`;

const SearchIcon = styled(Search)`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: ${({ theme }) => theme.colors.textMuted};
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 6px 28px 6px 30px;
  font-size: 13px;
  font-family: inherit;
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  border-radius: 6px;
  outline: none;
  background: ${({ theme }) => theme.colors.backgroundApp};
  color: ${({ theme }) => theme.colors.textMain};
  transition: all 0.15s;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 2px ${({ theme }) => theme.colors.primaryLight};
  }
`;

const SearchClear = styled.button`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  padding: 2px;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.textMuted};
  display: flex;
  align-items: center;
  border-radius: 3px;
  &:hover {
    color: ${({ theme }) => theme.colors.textMain};
  }
`;

const List = styled.ul`
  list-style: none;
  padding: 4px;
  margin: 0;
  overflow-y: auto;
  flex: 1;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.borderDefault};
    border-radius: 4px;
  }
`;

const NoResult = styled.li`
  padding: 12px 14px;
  font-size: 13px;
  color: ${({ theme }) => theme.colors.textMuted};
  text-align: center;
`;

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
        <div ref={ref} style={{ ...floatingStyles, zIndex: 9999, display: "flex", flexDirection: "column" }}>
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
