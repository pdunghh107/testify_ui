import styled from "styled-components";
import { fadeIn } from "../../../../components/common/animations/keyframes";

export const PageWrapper = styled.div`
  overflow: hidden;
  display: flex;
  height: 100vh;
`;

export const LeftPanel = styled.div`
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

export const RightPanel = styled.div`
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

export const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 480px;
`;

export const Title = styled.h1`
  margin-bottom: 16px;
  font-size: 36px;
  font-weight: 800;
  line-height: 1.2;
`;

export const Subtitle = styled.p`
  margin-bottom: 40px;
  font-size: 15px;
  line-height: 1.7;
  opacity: 0.75;
`;

export const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

export const FeatureItem = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;

  padding: 12px 16px;
  border-radius: 10px;

  background: rgb(255 255 255 / 10%);
`;

export const FeatureIconWrapper = styled.div`
  opacity: 0.9;
`;

export const FeatureText = styled.span`
  font-size: 14px;
  opacity: 0.9;
`;

export const FormBox = styled.div`
  width: 100%;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

export const RightLogo = styled.img`
  display: block;
  height: 48px;
  margin: 0 auto 32px;
  object-fit: contain;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Copyright = styled.div`
  margin-top: 32px;
  font-size: 12px;
  color: #94a3b8;
  text-align: center;
`;

export const LinkText = styled.div`
  margin-top: 16px;
  font-size: 14px;
  color: #64748b;
  text-align: center;

  a {
    font-weight: 600;
    color: #3b82f6;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
