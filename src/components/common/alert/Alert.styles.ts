import styled from 'styled-components';
import { colors } from '../../../styles/colors';
import { fonts } from '../../../styles/fonts';

// 1. Map cấu hình màu sắc động dựa trên variant
export const alertColorMap = {
  success: {
    bg: colors.successLight,
    border: colors.success,
    text: colors.success,
    iconBg: colors.success,
    iconColor: '#fff',
  },
  error: {
    bg: colors.dangerLight,
    border: colors.danger,
    text: colors.danger,
    iconBg: colors.danger,
    iconColor: '#fff',
  },
  warning: {
    bg: colors.warningLight,
    border: colors.warning,
    text: colors.warning,
    iconBg: colors.warning,
    iconColor: '#fff',
  },
  info: {
    bg: colors.infoLight,
    border: colors.info,
    text: colors.info,
    iconBg: colors.info,
    iconColor: '#fff',
  },
};

export type AlertVariantType = keyof typeof alertColorMap;

export const alertSizeMap = {
  sm: {
    padding: '12px 16px',
    iconContainerSize: 28,
    iconSize: 16,
    titleStyle: fonts.variants.smallBold,
    bodyStyle: fonts.variants.smallRegular,
    closeSize: 16,
    gap: 12,
    borderRadius: 8,
  },
  md: {
    padding: '16px 20px',
    iconContainerSize: 36,
    iconSize: 20,
    titleStyle: fonts.variants.baseBold,
    bodyStyle: fonts.variants.baseRegular,
    closeSize: 18,
    gap: 16,
    borderRadius: 12,
  },
  lg: {
    padding: '20px 24px',
    iconContainerSize: 44,
    iconSize: 24,
    titleStyle: fonts.variants.largeBold,
    bodyStyle: fonts.variants.largeRegular,
    closeSize: 20,
    gap: 20,
    borderRadius: 16,
  }
};

export type AlertSizeType = keyof typeof alertSizeMap;

// 2. Styled Components với Transient Props
export const StyledAlert = styled.div<{ $variant: AlertVariantType; $hasTitle: boolean; $size: AlertSizeType }>`
  display: flex;
  align-items: ${({ $hasTitle }) => ($hasTitle ? 'flex-start' : 'center')};
  gap: ${({ $size }) => alertSizeMap[$size].gap}px;
  padding: ${({ $size }) => alertSizeMap[$size].padding};
  border-radius: ${({ $size }) => alertSizeMap[$size].borderRadius}px;
  border: 1px solid ${({ $variant }) => alertColorMap[$variant].border};
  background-color: ${({ $variant }) => alertColorMap[$variant].bg};
  color: ${({ $variant }) => alertColorMap[$variant].text};
  position: relative;
  animation: fadeIn 0.3s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(-4px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

export const StyledIconContainer = styled.div<{ $variant: AlertVariantType; $size: AlertSizeType }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $size }) => alertSizeMap[$size].iconContainerSize}px;
  height: ${({ $size }) => alertSizeMap[$size].iconContainerSize}px;
  border-radius: ${({ $size }) => alertSizeMap[$size].borderRadius - 2}px;
  background-color: ${({ $variant }) => alertColorMap[$variant].iconBg};
  color: ${({ $variant }) => alertColorMap[$variant].iconColor};
`;

export const StyledCloseButton = styled.button<{ $variant: AlertVariantType; $size: AlertSizeType }>`
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: ${({ $variant }) => alertColorMap[$variant].text};
  opacity: 0.6;
  border-radius: 6px;
  transition: opacity 0.2s;
  flex-shrink: 0;
  
  &:hover {
    opacity: 1;
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export const AlertTitle = styled.h4<{ $size: AlertSizeType }>`
  margin: 0 0 4px 0;
  ${({ $size }) => alertSizeMap[$size].titleStyle}
`;

export const AlertBody = styled.div<{ $size: AlertSizeType }>`
  ${({ $size }) => alertSizeMap[$size].bodyStyle}
  line-height: 1.5;
`;
