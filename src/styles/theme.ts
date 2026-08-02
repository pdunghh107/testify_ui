// src/styles/theme.ts
import { colors } from "./colors";
import { fonts } from "./fonts";

export const theme = {
  colors,
  fonts,
};

// Bước khai báo type cực kỳ quan trọng cho TypeScript
export type AppTheme = typeof theme;
