import React, { useState } from "react";
import styled from "styled-components";
import { getInitials, getAvatarColors } from "../../../utils/avatar";
import { fonts } from "../../../styles/fonts";

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
  src?: string | null;
  size?: number;
  color?: string;
  bgColor?: string;
  fontSize?: number;
  children?: React.ReactNode;
}

const AvatarContainer = styled.div<{
  $size: number;
  $bgColor: string;
  $color: string;
  $fontSize: number;
}>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${fonts.family.base};
  font-weight: ${fonts.weight.semibold};
  font-size: ${({ $fontSize }) => $fontSize}px;
  background-color: ${({ $bgColor }) => $bgColor};
  color: ${({ $color }) => $color};
  overflow: hidden;
  flex-shrink: 0;
  user-select: none;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { name, src, size = 36, color, bgColor, fontSize, children, ...rest },
    ref,
  ) => {
    // Sử dụng State thay vì thao tác DOM trực tiếp (chuẩn Declarative)
    const [imgError, setImgError] = useState(false);

    const generatedColors = getAvatarColors(name);
    const finalColor = color || generatedColors.text;
    const finalBgColor = bgColor || generatedColors.bg;
    const defaultFontSize = fontSize || Math.max(11, Math.floor(size / 2.7));

    return (
      <AvatarContainer
        ref={ref}
        $size={size}
        $color={finalColor}
        $bgColor={finalBgColor}
        $fontSize={defaultFontSize}
        {...rest}
      >
        {src && !imgError ? (
          <img src={src} alt={name} onError={() => setImgError(true)} />
        ) : children ? (
          children
        ) : (
          getInitials(name)
        )}
      </AvatarContainer>
    );
  },
);

Avatar.displayName = "Avatar";
