import { z } from "zod";

export const deactivateSchema = z.object({
  password: z.string().min(1, "Vui lòng nhập mật khẩu để xác nhận"),
});

export type DeactivateInput = z.infer<typeof deactivateSchema>;
