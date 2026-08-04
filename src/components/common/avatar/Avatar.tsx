import React, { useState } from "react";
import styled from "styled-components";

import { fonts } from "../../../styles/fonts";
import { getAvatarColors, getInitials } from "../../../utils/avatar";

/**
 * Cấu hình Props cho component Avatar.
 */
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
  $interactive?: boolean;
}>`
  user-select: none;

  overflow: hidden;
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  border-radius: 8px;

  font-family: ${fonts.family.base};
  font-size: ${({ $fontSize }) => $fontSize}px;
  font-weight: ${fonts.weight.semibold};
  color: ${({ $color }) => $color};

  background-color: ${({ $bgColor }) => $bgColor};

  ${({ $interactive }) =>
    $interactive &&
    `
    cursor: pointer;
    transition: filter 0.2s, opacity 0.2s, transform 0.1s;
    &:hover {
      filter: brightness(0.9);
      opacity: 0.9;
    }
    &:active {
      transform: scale(0.95);
    }
  `}

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

/**
 * Component Avatar dùng để hiển thị ảnh đại diện hoặc tên viết tắt của người dùng.
 * Tự động tạo màu nền (dựa trên tên) nếu không có ảnh src.
 *
 * @example
 * ```tsx
 * // Hiển thị ảnh
 * <Avatar name="Nguyễn Văn A" src="https://example.com/avatar.jpg" size={40} />
 *
 * // Hiển thị chữ cái đầu (N) với màu ngẫu nhiên
 * <Avatar name="Nguyễn Văn A" size={40} />
 * ```
 */
export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  (
    { name, src, size = 36, color, bgColor, fontSize, children, onClick, ...rest },
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
        $interactive={!!onClick}
        onClick={onClick}
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
