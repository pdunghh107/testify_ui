import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@tanstack/react-router";
import { Lock, Mail } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";

import { Button } from "@/components/common/button/Button";
import { InputField } from "@/components/form/InputField";
import { PasswordInput } from "@/components/form/PasswordInput";
import { useLogin } from "@/features/auth/api/useLogin";
import { type LoginFormData, loginSchema } from "@/features/auth/validations/login-schema";
import { AuthLayout } from "./layout/AuthLayout";
import * as S from "./layout/AuthLayout.styles";

export const LoginForm = () => {
  const loginMutation = useLogin();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data);
  };

  const isPending = loginMutation.isPending;

  return (
    <AuthLayout
      title="Chào mừng đến với Testify"
      subtitle="Đăng nhập để sử dụng công cụ kiểm thử API tự động."
    >
      <FormProvider {...methods}>
        <S.StyledForm onSubmit={handleSubmit(onSubmit)}>
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

          <Button
            type="submit"
            isLoading={isPending}
            disabled={isPending}
            variant="primary"
            style={{ width: "100%" }}
          >
            Đăng nhập
          </Button>

          <S.LinkText>
            Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
          </S.LinkText>

          <S.LinkText style={{ marginTop: "0px" }}>
            <a
              href="/forgot-password"
              style={{ color: "#94a3b8", fontWeight: "normal" }}
            >
              Quên mật khẩu?
            </a>
          </S.LinkText>
        </S.StyledForm>
      </FormProvider>
    </AuthLayout>
  );
};
