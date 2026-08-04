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
  overflow: auto; /* Cho phép scroll toàn trang nếu cần */
  display: flex;
  flex-direction: column;
  gap: 16px;

  box-sizing: border-box;
  height: 100%;
  padding: 24px;

  background-color: ${colors.backgroundApp};
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.h1`
  margin: 0;

  font-size: 24px;
  font-weight: 800;

  background: ${colors.brandGradient};
  background-clip: text;

  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.div`
  margin-top: 4px;
  font-size: 14px;
  color: ${colors.textMuted};
`;

const ToolbarSection = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ContentBox = styled.div`
  display: flex;
  flex: 1;
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
