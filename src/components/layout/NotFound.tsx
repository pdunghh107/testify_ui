import styled from "styled-components";
import { Link } from "@tanstack/react-router";
import { AlertCircle } from "lucide-react";
import { PrimaryButton } from "../common/button/Button";
import { Text } from "../common/text/Text";
import { Flex } from "./flex/Flex";

const NotFoundContainer = styled(Flex)`
  min-height: 100vh;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.backgroundApp};
  color: ${({ theme }) => theme.colors.textMain};
  text-align: center;
  padding: 24px;
`;

const IconWrapper = styled.div`
  color: ${({ theme }) => theme.colors.danger};
  svg {
    width: 80px;
    height: 80px;
  }
}
`;

export const NotFound = () => {
  return (
    <NotFoundContainer direction="column" align="center" justify="center">
      <IconWrapper>
        <AlertCircle strokeWidth={1.5} />
      </IconWrapper>
      <Text as="h1" variant="displayBold" color="textMain">
        404
      </Text>
      <Text
        as="h2"
        variant="xxlargeMedium"
        color="textMuted"
        style={{ margin: "8px 0 24px" }}
      >
        Trang bạn tìm kiếm không tồn tại
      </Text>
      <Link to="/" style={{ textDecoration: "none" }}>
        <PrimaryButton>Quay về trang chủ</PrimaryButton>
      </Link>
    </NotFoundContainer>
  );
};
