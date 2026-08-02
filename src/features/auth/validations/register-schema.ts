import { z } from "zod";

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: "Họ và tên phải có ít nhất 2 ký tự" })
    .max(255, { message: "Họ và tên quá dài" }),
  phone: z
    .string()
    .min(10, { message: "Số điện thoại phải có ít nhất 10 số" })
    .max(15, { message: "Số điện thoại không hợp lệ" })
    .regex(/^[0-9]+$/, { message: "Số điện thoại chỉ bao gồm chữ số" }),
  email: z
    .string()
    .min(1, { message: "Email là bắt buộc" })
    .email({ message: "Email không đúng định dạng" }),
  password: z
    .string()
    .min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
      message:
        "Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt",
    }),
  confirmPassword: z.string().min(1, { message: "Xác nhận mật khẩu là bắt buộc" }),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Mật khẩu xác nhận không khớp",
});

export type RegisterFormData = z.infer<typeof registerSchema>;
