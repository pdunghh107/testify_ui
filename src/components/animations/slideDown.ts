import { keyframes, css } from "styled-components";

export const slideDownKeyframe = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
    max-height: 0;
  }
  to {
    opacity: 1;
    transform: translateY(0);
    max-height: 2000px;
  }
`;

export const slideUpKeyframe = keyframes`
  from {
    opacity: 1;
    transform: translateY(0);
    max-height: 2000px;
  }
  to {
    opacity: 0;
    transform: translateY(-8px);
    max-height: 0;
  }
`;

// Helper mixin để nhúng vào styled component dễ dàng
export const slideDownAnimation = css`
  animation: ${slideDownKeyframe} 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  transform-origin: top;
  overflow: hidden;
`;
