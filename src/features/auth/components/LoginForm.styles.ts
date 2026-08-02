import styled from "styled-components";

import { fadeIn } from "../../../components/common/animations/keyframes";

export const LoginPageWrapper = styled.div`
  overflow: hidden;
  display: flex;
  height: 100vh;
`;

export const LoginLeftPanel = styled.div`
  position: relative;

  overflow: hidden;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  padding: 60px;

  color: white;

  background: var(
    --brand-gradient,
    linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%)
  );

  &::before {
    content: "";

    position: absolute;
    top: -100px;
    right: -100px;

    width: 400px;
    height: 400px;
    border-radius: 50%;

    background: rgb(255 255 255 / 5%);
  }

  &::after {
    content: "";

    position: absolute;
    bottom: -80px;
    left: -80px;

    width: 300px;
    height: 300px;
    border-radius: 50%;

    background: rgb(255 255 255 / 4%);
  }

  @media (width <= 1024px) {
    display: none;
  }
`;

export const LoginRightPanel = styled.div`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;

  width: 440px;
  padding: 48px;

  background: white;

  @media (width <= 1024px) {
    width: 100%;
    padding: 24px;
  }
`;

export const LoginContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
`;

export const LoginLogoContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  margin-bottom: 48px;
`;

export const LoginLogoBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;
  padding: 4px;
  border-radius: 12px;

  background: white;
`;

export const LoginLogoImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const LoginAppName = styled.div`
  font-size: 20px;
  font-weight: 800;
`;

export const LoginAppSubtitle = styled.div`
  font-size: 12px;
  opacity: 0.7;
`;

export const LoginTitle = styled.h1`
  margin-bottom: 16px;
  font-size: 36px;
  font-weight: 800;
  line-height: 1.2;
`;

export const LoginSubtitle = styled.p`
  margin-bottom: 40px;
  font-size: 15px;
  line-height: 1.7;
  opacity: 0.75;
`;

export const LoginFeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const LoginFeatureItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  padding: 12px 16px;
  border-radius: 10px;

  background: rgb(255 255 255 / 10%);
`;

export const LoginFeatureIconWrapper = styled.div`
  opacity: 0.9;
`;

export const LoginFeatureText = styled.span`
  font-size: 14px;
  opacity: 0.9;
`;

export const LoginFormBox = styled.div`
  width: 100%;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const LoginRightLogo = styled.img`
  display: block;
  height: 48px;
  margin: 0 auto 32px auto;
  object-fit: contain;
`;

export const LoginFormSubtitle = styled.p`
  margin-bottom: 28px;
  font-size: 14px;
  color: #64748b;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LoginPasswordToggle = styled.button`
  cursor: pointer;

  display: flex;
  align-items: center;

  padding: 0;
  border: none;

  color: #94a3b8;

  background: none;

  &:hover {
    color: #64748b;
  }
`;

export const LoginDemoBox = styled.div`
  margin-top: 8px;
  padding: 16px;
  border-radius: 10px;

  font-size: 12px;
  line-height: 1.7;
  color: var(--brand-900, #14532d);

  background: var(--brand-50, #f0fdf4);
`;

export const LoginForgotBox = styled.div`
  margin-top: 8px;
  padding: 16px;
  border: 1px solid #fed7aa;
  border-radius: 10px;

  font-size: 12px;
  line-height: 1.7;
  color: #9a3412;

  background: #fff7ed;
`;

export const LoginCopyright = styled.div`
  margin-top: 32px;
  font-size: 12px;
  color: #94a3b8;
  text-align: center;
`;
