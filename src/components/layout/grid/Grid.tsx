import React from "react";
import styled from "styled-components";

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
