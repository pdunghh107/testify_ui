// import original module declarations
import "styled-components";
// import type AppTheme mà bạn đã định nghĩa ở file theme.ts
import { AppTheme } from "../styles/theme";

// Mở rộng module styled-components
declare module "styled-components" {
  // Ghi đè (override) type DefaultTheme mặc định bằng type AppTheme của Workspace
  export interface DefaultTheme extends AppTheme {}
}
