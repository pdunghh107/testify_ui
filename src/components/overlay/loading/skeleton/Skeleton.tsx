import styled, { keyframes, css } from "styled-components";
import React from "react";
import { colors } from "../../../../styles/colors";

const shimmer = keyframes`
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
`;

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "text" | "rectangular" | "circular";
  width?: string | number;
  height?: string | number;
}

interface StyledSkeletonProps {
  $variant?: "text" | "rectangular" | "circular";
  $width?: string | number;
  $height?: string | number;
}

const StyledSkeleton = styled.div<StyledSkeletonProps>`
  background: linear-gradient(
    90deg,
    ${colors.borderLight} 25%,
    ${colors.backgroundHover} 50%,
    ${colors.borderLight} 75%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 1.5s infinite linear;

  width: ${({ $width, $variant }) =>
    $width
      ? typeof $width === "number"
        ? `${$width}px`
        : $width
      : $variant === "text"
        ? "100%"
        : "auto"};

  height: ${({ $height, $variant }) =>
    $height
      ? typeof $height === "number"
        ? `${$height}px`
        : $height
      : $variant === "text"
        ? "1rem"
        : "auto"};

  ${({ $variant }) => {
    switch ($variant) {
      case "circular":
        return css`
          border-radius: 50%;
        `;
      case "rectangular":
        return css`
          border-radius: 8px;
        `;
      case "text":
      default:
        return css`
          border-radius: 4px;
          margin-bottom: 0.5rem;
        `;
    }
  }}
`;

export function Skeleton({
  variant = "text",
  width,
  height,
  ...props
}: SkeletonProps) {
  return (
    <StyledSkeleton
      $variant={variant}
      $width={width}
      $height={height}
      {...props}
    />
  );
}
