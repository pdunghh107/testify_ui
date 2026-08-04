import { z } from "zod";
import { PASSWORD_ERROR_MESSAGE, PASSWORD_REGEX } from "../constants/validation";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Vui lòng nhập mật khẩu cũ"),
    newPassword: z
      .string()
      .min(1, "Vui lòng nhập mật khẩu mới")
      .regex(PASSWORD_REGEX, { message: PASSWORD_ERROR_MESSAGE }),
    confirmPassword: z.string().min(1, "Vui lòng xác nhận mật khẩu mới"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

export type ChangePasswordInput = z.infer<typeof changePasswordSchema>;
