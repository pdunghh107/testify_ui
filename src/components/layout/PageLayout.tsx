import React from "react";
import styled from "styled-components";

import { colors } from "@/styles/colors";

export interface PageLayoutProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  toolbar?: React.ReactNode;
  content: React.ReactNode;
}

const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  background-color: ${colors.backgroundApp};
  height: 100%;
  padding: 24px;
  box-sizing: border-box;
  overflow: auto; /* Cho phép scroll toàn trang nếu cần */
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 800;
  margin: 0;
  background: ${colors.brandGradient};
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.div`
  font-size: 14px;
  color: ${colors.textMuted};
  margin-top: 4px;
`;

const ToolbarSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ContentBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export function PageLayout({
  title,
  subtitle,
  toolbar,
  content,
}: PageLayoutProps) {
  return (
    <LayoutContainer>
      <HeaderSection>
        <div>
          {title &&
            (typeof title === "string" ? <Title>{title}</Title> : title)}
          {subtitle &&
            (typeof subtitle === "string" ? (
              <Subtitle>{subtitle}</Subtitle>
            ) : (
              subtitle
            ))}
        </div>
        {toolbar && <ToolbarSection>{toolbar}</ToolbarSection>}
      </HeaderSection>

      <ContentBox>{content}</ContentBox>
    </LayoutContainer>
  );
}
