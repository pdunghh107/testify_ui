import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "@tanstack/react-router";
import { Lock, Mail } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "../../../components/common/button/Button";
import { InputField } from "../../../components/form/InputField";
import { PasswordInput } from "../../../components/form/PasswordInput";
import { useCrmLogin } from "../api/useLogin";
import { LOGIN_FEATURES } from "../constants/loginFeatures";
import { type LoginFormData, loginSchema } from "../validations/login-schema";
import * as S from "./LoginForm.styles";

export const LoginForm = () => {
  const navigate = useNavigate();
  const loginMutation = useCrmLogin();

  const methods = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const { handleSubmit } = methods;

  const onSubmit = (data: LoginFormData) => {
    loginMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Đăng nhập thành công!");
        navigate({ to: "/" });
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Đăng nhập thất bại");
      },
    });
  };

  const isPending = loginMutation.isPending;

  return (
    <S.LoginPageWrapper>
      <S.LoginLeftPanel>
        <S.LoginContentWrapper>


          <S.LoginTitle>Chào mừng đến với Testify</S.LoginTitle>
          <S.LoginSubtitle>
            Đăng nhập để sử dụng công cụ kiểm thử API tự động.
          </S.LoginSubtitle>

          <S.LoginFeaturesList>
            {LOGIN_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <S.LoginFeatureItem key={idx}>
                  <S.LoginFeatureIconWrapper>
                    <Icon size={20} />
                  </S.LoginFeatureIconWrapper>
                  <S.LoginFeatureText>{feature.text}</S.LoginFeatureText>
                </S.LoginFeatureItem>
              );
            })}
          </S.LoginFeaturesList>
        </S.LoginContentWrapper>
      </S.LoginLeftPanel>

      <S.LoginRightPanel>
        <S.LoginFormBox>
          <S.LoginRightLogo src="/testify_final_logo.png" alt="Testify" />

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

              <div style={{ textAlign: "center", marginTop: "16px", fontSize: "14px", color: "#64748b" }}>
                Chưa có tài khoản? <Link to="/register" style={{ color: "#3b82f6", fontWeight: 600, textDecoration: "none" }}>Đăng ký ngay</Link>
              </div>

              <div style={{ textAlign: "center", marginTop: "16px" }}>
                <Link to="/forgot-password" style={{ color: "#94a3b8", fontSize: "14px", textDecoration: "none" }}>Forgot password?</Link>
              </div>

              <S.LoginCopyright>
                © 2026 Testify. All rights reserved.
              </S.LoginCopyright>
            </S.StyledForm>
          </FormProvider>
        </S.LoginFormBox>
      </S.LoginRightPanel>
    </S.LoginPageWrapper>
  );
};
