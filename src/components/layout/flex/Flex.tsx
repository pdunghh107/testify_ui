import React, { type ElementType, type ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

export type FlexProps<E extends ElementType = "div"> = {
  as?: E;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justify?: "flex-start" | "center" | "flex-end" | "space-between" | "space-around" | "space-evenly";
  wrap?: "nowrap" | "wrap" | "wrap-reverse";
  gap?: number | string;
  flex?: number | string;
} & ComponentPropsWithoutRef<E>;

const StyledFlex = styled.div<{
  $direction: FlexProps<any>["direction"];
  $align: FlexProps<any>["align"];
  $justify: FlexProps<any>["justify"];
  $wrap: FlexProps<any>["wrap"];
  $gap: FlexProps<any>["gap"];
  $flex?: FlexProps<any>["flex"];
}>`
  display: flex;
  flex-direction: ${({ $direction }) => $direction};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
  flex-wrap: ${({ $wrap }) => $wrap};
  gap: ${({ $gap }) => (typeof $gap === "number" ? `${$gap}px` : $gap)};
  ${({ $flex }) => ($flex !== undefined ? `flex: ${$flex};` : "")}
`;

// ForwardRef với generic type cho phép polymorphic component
type FlexComponent = <E extends ElementType = "div">(
  props: FlexProps<E> & { ref?: React.Ref<Element> }
) => React.ReactElement | null;

export const Flex: FlexComponent = React.forwardRef(
  <E extends ElementType = "div">(
    {
      as,
      direction = "row",
      align = "stretch",
      justify = "flex-start",
      wrap = "nowrap",
      gap = 0,
      flex,
      children,
      ...rest
    }: FlexProps<E>,
    ref: React.Ref<Element>
  ) => {
    return (
      <StyledFlex
        as={as || "div"}
        ref={ref as any}
        $direction={direction}
        $align={align}
        $justify={justify}
        $wrap={wrap}
        $gap={gap}
        $flex={flex}
        {...(rest as any)}
      >
        {children}
      </StyledFlex>
    );
  }
) as any;

(Flex as any).displayName = "Flex";
