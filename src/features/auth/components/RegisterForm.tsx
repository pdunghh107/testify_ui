import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Lock, Mail, Phone, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/common/button/Button";
import { InputField } from "@/components/form/InputField";
import { PasswordInput } from "@/components/form/PasswordInput";
import { useRegister } from "@/features/auth/api/useRegister";
import {
  type RegisterFormData,
  registerSchema,
} from "@/features/auth/validations/register-schema";
import { AuthLayout } from "./layout/AuthLayout";
import * as S from "./layout/AuthLayout.styles";

export const RegisterForm = () => {
  const registerMutation = useRegister();

  const methods = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: RegisterFormData) => {
    registerMutation.mutate(data);
  };

  const isPending = registerMutation.isPending;

  return (
    <AuthLayout
      title="Khởi đầu mới"
      subtitle="Tạo tài khoản để trải nghiệm công cụ kiểm thử API tự động."
    >
      <FormProvider {...methods}>
        <S.StyledForm onSubmit={handleSubmit(onSubmit)}>
          <InputField
            name="fullName"
            label="Họ và tên"
            placeholder="Nhập họ và tên của bạn"
            disabled={isPending}
            leftIcon={<User size={16} />}
          />

          <InputField
            name="phone"
            label="Số điện thoại"
            placeholder="Nhập số điện thoại"
            disabled={isPending}
            leftIcon={<Phone size={16} />}
          />

          <InputField
            name="email"
            label="Email"
            type="email"
            placeholder="Nhập email của bạn"
            disabled={isPending}
            leftIcon={<Mail size={16} />}
          />

          <PasswordInput
            name="password"
            label="Mật khẩu"
            placeholder="Nhập mật khẩu"
            disabled={isPending}
            leftIcon={<Lock size={16} />}
          />

          <PasswordInput
            name="confirmPassword"
            label="Xác nhận mật khẩu"
            placeholder="Nhập lại mật khẩu"
            disabled={isPending}
            leftIcon={<Lock size={16} />}
          />

          <Button
            type="submit"
            isLoading={isPending}
            disabled={isPending}
            variant="primary"
            style={{ width: "100%", marginTop: "8px" }}
          >
            Đăng ký ngay
          </Button>

          <S.LinkText>
            Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
          </S.LinkText>
        </S.StyledForm>
      </FormProvider>
    </AuthLayout>
  );
};
