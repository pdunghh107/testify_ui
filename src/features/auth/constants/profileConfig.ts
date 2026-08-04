import { type ButtonProps } from "@/components/common/button/Button";

export type ProfileActionId = "CHANGE_PASSWORD" | "DEACTIVATE_ACCOUNT";

export interface ProfileActionConfig {
  id: ProfileActionId;
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: ButtonProps["variant"];
  isDanger?: boolean;
}

export const SECURITY_ACTIONS: ProfileActionConfig[] = [
  {
    id: "CHANGE_PASSWORD",
    title: "Đổi mật khẩu",
    description: "Cập nhật mật khẩu để bảo vệ tài khoản của bạn.",
    buttonText: "Đổi mật khẩu",
  },
];

export const DANGER_ZONE_ACTIONS: ProfileActionConfig[] = [
  {
    id: "DEACTIVATE_ACCOUNT",
    title: "Vô hiệu hóa tài khoản",
    description:
      "Khi vô hiệu hóa tài khoản, bạn sẽ không thể đăng nhập lại được. Hành động này không thể hoàn tác.",
    buttonText: "Vô hiệu hóa",
    buttonVariant: "danger",
    isDanger: true,
  },
];
