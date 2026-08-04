import { z } from "zod";

export const updateProfileSchema = z.object({
  fullName: z.string().min(1, "Họ và tên không được để trống"),
  email: z.string().email("Email không hợp lệ").optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
