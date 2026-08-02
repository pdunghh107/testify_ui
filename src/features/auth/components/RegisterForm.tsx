import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "@tanstack/react-router";
import { Lock, Mail, Phone, User } from "lucide-react";
import { FormProvider, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

import { Button } from "../../../components/common/button/Button";
import { InputField } from "../../../components/form/InputField";
import { PasswordInput } from "../../../components/form/PasswordInput";
import { useCrmRegister } from "../api/useRegister";
import { LOGIN_FEATURES } from "../constants/loginFeatures";
import {
  type RegisterFormData,
  registerSchema,
} from "../validations/register-schema";
import * as S from "./RegisterForm.styles";

// Thêm link điều hướng cho trang đăng ký

export const RegisterForm = () => {
  const navigate = useNavigate();
  const registerMutation = useCrmRegister();

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
    // Loại bỏ confirmPassword ra khỏi payload
    const { confirmPassword, ...payload } = data;

    registerMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Đăng ký thành công!");
        navigate({ to: "/" });
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || "Đăng ký thất bại");
      },
    });
  };

  const isPending = registerMutation.isPending;

  return (
    <S.RegisterPageWrapper>
      <S.RegisterLeftPanel>
        <S.RegisterContentWrapper>
          <S.RegisterTitle>Khởi đầu mới</S.RegisterTitle>
          <S.RegisterSubtitle>
            Tạo tài khoản để trải nghiệm công cụ kiểm thử API tự động.
          </S.RegisterSubtitle>

          <S.RegisterFeaturesList>
            {LOGIN_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <S.RegisterFeatureItem key={idx}>
                  <S.RegisterFeatureIconWrapper>
                    <Icon size={20} />
                  </S.RegisterFeatureIconWrapper>
                  <S.RegisterFeatureText>{feature.text}</S.RegisterFeatureText>
                </S.RegisterFeatureItem>
              );
            })}
          </S.RegisterFeaturesList>
        </S.RegisterContentWrapper>
      </S.RegisterLeftPanel>

      <S.RegisterRightPanel>
        <S.RegisterFormBox>
          <S.RegisterRightLogo src="/testify_final_logo.png" alt="Testify" />

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

              <S.RegisterLink>
                Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
              </S.RegisterLink>

              <S.RegisterCopyright>
                © 2026 Testify. All rights reserved.
              </S.RegisterCopyright>
            </S.StyledForm>
          </FormProvider>
        </S.RegisterFormBox>
      </S.RegisterRightPanel>
    </S.RegisterPageWrapper>
  );
};
