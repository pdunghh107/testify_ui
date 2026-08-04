import React, { type ElementType, type ComponentPropsWithoutRef } from "react";
import styled from "styled-components";

/**
 * Cấu hình Props cho component Flex.
 */
export type FlexProps<E extends ElementType = "div"> = {
  as?: E;
  direction?: "row" | "row-reverse" | "column" | "column-reverse";
  align?: "flex-start" | "center" | "flex-end" | "stretch" | "baseline";
  justify?:
    | "flex-start"
    | "center"
    | "flex-end"
    | "space-between"
    | "space-around"
    | "space-evenly";
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
  flex-flow: ${({ $direction }) => $direction} ${({ $wrap }) => $wrap};
  gap: ${({ $gap }) => (typeof $gap === "number" ? `${$gap}px` : $gap)};
  align-items: ${({ $align }) => $align};
  justify-content: ${({ $justify }) => $justify};
  ${({ $flex }) => ($flex !== undefined ? `flex: ${$flex};` : "")}
`;

/**
 * Hỗ trợ TypeScript nhận diện Component đa hình (Polymorphic Component).
 */
type FlexComponent = <E extends ElementType = "div">(
  props: FlexProps<E> & { ref?: React.Ref<Element> },
) => React.ReactElement | null;

/**
 * Component Flex hỗ trợ tạo layout flexbox nhanh chóng thông qua các props.
 * Hỗ trợ truyền thẻ HTML tuỳ chỉnh qua prop `as` (VD: `as="section"`).
 *
 * @example
 * ```tsx
 * <Flex direction="column" align="center" gap={16}>
 *   <div>Mục 1</div>
 *   <div>Mục 2</div>
 * </Flex>
 * ```
 */
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
    ref: React.Ref<Element>,
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
  },
) as any;

(Flex as any).displayName = "Flex";
