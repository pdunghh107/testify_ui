import React, { type ElementType, type HTMLAttributes } from "react";
import styled, { css } from "styled-components";
import { colors } from "../../../styles/colors";
import { fonts } from "../../../styles/fonts";

export type ColorKey = keyof typeof colors;
export type VariantKey = keyof typeof fonts.variants;

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: VariantKey;
  color?: ColorKey;
  align?: "left" | "center" | "right" | "justify";
}

const StyledText = styled.span<{
  $variant: VariantKey;
  $color: ColorKey;
  $align?: string;
}>`
  margin: 0;
  color: ${({ $color }) => colors[$color] || colors.textMain};
  text-align: ${({ $align }) => $align || "left"};

  ${({ $variant }) => {
    const v = fonts.variants[$variant] || fonts.variants.baseRegular;
    return css`
      font-size: ${v.fontSize};
      font-weight: ${v.fontWeight};
    `;
  }}
`;

export const Text = React.forwardRef<HTMLElement, TextProps>(
  (
    {
      as = "span",
      variant = "baseRegular",
      color = "textMain",
      align,
      children,
      ...rest
    },
    ref,
  ) => {
    return (
      <StyledText
        as={as}
        ref={ref}
        $variant={variant}
        $color={color}
        $align={align}
        {...rest}
      >
        {children}
      </StyledText>
    );
  },
);

Text.displayName = "Text";
