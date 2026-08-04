import { type ReactNode } from "react";
import { LOGIN_FEATURES } from "../../constants/loginFeatures";
import * as S from "./AuthLayout.styles";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export const AuthLayout = ({ title, subtitle, children }: AuthLayoutProps) => {
  return (
    <S.PageWrapper>
      <S.LeftPanel>
        <S.ContentWrapper>
          <S.Title>{title}</S.Title>
          <S.Subtitle>{subtitle}</S.Subtitle>

          <S.FeaturesList>
            {LOGIN_FEATURES.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <S.FeatureItem key={idx}>
                  <S.FeatureIconWrapper>
                    <Icon size={20} />
                  </S.FeatureIconWrapper>
                  <S.FeatureText>{feature.text}</S.FeatureText>
                </S.FeatureItem>
              );
            })}
          </S.FeaturesList>
        </S.ContentWrapper>
      </S.LeftPanel>

      <S.RightPanel>
        <S.FormBox>
          <S.RightLogo src="/testify_final_logo.png" alt="Testify" />
          {children}
          <S.Copyright>© 2026 Testify. All rights reserved.</S.Copyright>
        </S.FormBox>
      </S.RightPanel>
    </S.PageWrapper>
  );
};
