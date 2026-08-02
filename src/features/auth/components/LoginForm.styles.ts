import styled from "styled-components";
import { fadeIn } from "../../../components/common/animations/keyframes";

export const LoginPageWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const LoginLeftPanel = styled.div`
  flex: 1;
  background: var(--brand-gradient, linear-gradient(135deg, #1e3a8a 0%, #3b82f6 100%));
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    top: -100px;
    right: -100px;
  }

  &::after {
    content: "";
    position: absolute;
    width: 300px;
    height: 300px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.04);
    bottom: -80px;
    left: -80px;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;

export const LoginRightPanel = styled.div`
  width: 440px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: white;
  padding: 48px;

  @media (max-width: 1024px) {
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
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
`;

export const LoginLogoBox = styled.div`
  width: 48px;
  height: 48px;
  background: white;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
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
  font-size: 36px;
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 16px;
`;

export const LoginSubtitle = styled.p`
  opacity: 0.75;
  font-size: 15px;
  line-height: 1.7;
  margin-bottom: 40px;
`;

export const LoginFeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const LoginFeatureItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  padding: 12px 16px;
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
  height: 44px;
  margin-bottom: 12px;
  object-fit: contain;
  display: block;
`;

export const LoginFormSubtitle = styled.p`
  color: #64748b;
  font-size: 14px;
  margin-bottom: 28px;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const LoginPasswordToggle = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  color: #94a3b8;
  padding: 0;
  
  &:hover {
    color: #64748b;
  }
`;

export const LoginDemoBox = styled.div`
  padding: 16px;
  background: var(--brand-50, #f0fdf4);
  border-radius: 10px;
  font-size: 12px;
  color: var(--brand-900, #14532d);
  line-height: 1.7;
  margin-top: 8px;
`;

export const LoginForgotBox = styled.div`
  padding: 16px;
  background: #fff7ed;
  border: 1px solid #fed7aa;
  border-radius: 10px;
  font-size: 12px;
  color: #9a3412;
  line-height: 1.7;
  margin-top: 8px;
`;

export const LoginCopyright = styled.div`
  margin-top: 32px;
  text-align: center;
  font-size: 12px;
  color: #94a3b8;
`;
