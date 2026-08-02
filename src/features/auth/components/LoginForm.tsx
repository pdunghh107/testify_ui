import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, Lock } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import { InputField } from "../../../components/form/InputField";
import { PasswordInput } from "../../../components/form/PasswordInput";
import { Button } from "../../../components/common/button/Button";
import { loginSchema, type LoginFormData } from "../validations/login-schema";
import { useCrmLogin } from "../api/useLogin";
import { LOGIN_FEATURES } from "../constants/loginFeatures";
import * as S from "./LoginForm.styles";
import { toast } from "react-hot-toast";

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
          <S.LoginLogoContainer>
            <S.LoginLogoBox>
              <S.LoginLogoImg src="/logo-icon.png" alt="FizaHUB" />
            </S.LoginLogoBox>
            <div>
              <S.LoginAppName>FizaHUB CRM</S.LoginAppName>
              <S.LoginAppSubtitle>Super Admin Dashboard</S.LoginAppSubtitle>
            </div>
          </S.LoginLogoContainer>

          <S.LoginTitle>Chào mừng trở lại</S.LoginTitle>
          <S.LoginSubtitle>
            Đăng nhập để truy cập vào hệ thống quản trị CRM.
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
          <S.LoginRightLogo src="/logo-full.png" alt="FizaHUB CRM" />
          <S.LoginFormSubtitle>Đăng nhập vào hệ thống</S.LoginFormSubtitle>

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

              <S.LoginDemoBox>
                <strong>Tài khoản Demo</strong> <br />
                admin@fizahub.com / Password@123
              </S.LoginDemoBox>

              <S.LoginForgotBox>
                🔐 <strong>Quên mật khẩu?</strong>
                <br />
                Vui lòng liên hệ Admin để cấp lại mật khẩu mới.
              </S.LoginForgotBox>

              <S.LoginCopyright>
                © 2026 FizaHUB. All rights reserved.
              </S.LoginCopyright>
            </S.StyledForm>
          </FormProvider>
        </S.LoginFormBox>
      </S.LoginRightPanel>
    </S.LoginPageWrapper>
  );
};
