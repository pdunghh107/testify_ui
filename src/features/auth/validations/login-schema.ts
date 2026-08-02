import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Vui lòng nhập email" })
    .email({ message: "Email không hợp lệ" }),
  password: z
    .string()
    .min(1, { message: "Vui lòng nhập mật khẩu" }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
