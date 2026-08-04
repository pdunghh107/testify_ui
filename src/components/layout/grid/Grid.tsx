import React from "react";
import styled from "styled-components";

/**
 * Cấu hình Props cho component Grid.
 */
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: number | string;
  gap?: number | string;
  align?: "start" | "center" | "end" | "stretch";
  justify?: "start" | "center" | "end" | "stretch";
}

const StyledGrid = styled.div<{
  $columns: GridProps["columns"];
  $gap: GridProps["gap"];
  $align: GridProps["align"];
  $justify: GridProps["justify"];
}>`
  display: grid;
  grid-template-columns: ${({ $columns }) =>
    typeof $columns === "number" ? `repeat(${$columns}, minmax(0, 1fr))` : $columns};
  gap: ${({ $gap }) => (typeof $gap === "number" ? `${$gap}px` : $gap)};
  ${({ $align }) => ($align ? `align-items: ${$align};` : "")}
  ${({ $justify }) => ($justify ? `justify-items: ${$justify};` : "")}
`;

/**
 * Component Grid hỗ trợ tạo layout dạng lưới nhanh chóng.
 * Truyền số vào prop `columns` để tạo lưới đều nhau, hoặc truyền chuỗi template để tùy chỉnh.
 *
 * @example
 * ```tsx
 * <Grid columns={3} gap={16}>
 *   <div>Cột 1</div>
 *   <div>Cột 2</div>
 *   <div>Cột 3</div>
 * </Grid>
 * ```
 */
export const Grid = React.forwardRef<HTMLDivElement, GridProps>(
  (
    { columns = 1, gap = 0, align, justify, children, ...rest },
    ref
  ) => {
    return (
      <StyledGrid
        ref={ref}
        $columns={columns}
        $gap={gap}
        $align={align}
        $justify={justify}
        {...rest}
      >
        {children}
      </StyledGrid>
    );
  }
);

Grid.displayName = "Grid";
