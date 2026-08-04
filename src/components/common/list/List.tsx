import React from "react";
import { colors } from "@/styles/colors";
import * as S from "./List.styles";
import { Button, type ButtonProps } from "@/components/common/button/Button";
import { Text } from "@/components/common/text/Text";
import { Flex } from "@/components/layout/flex/Flex";

interface ListProps {
  children: React.ReactNode;
  variant?: "default" | "danger";
}

export const List: React.FC<ListProps> = ({ children, variant = "default" }) => {
  return <S.ListContainer $variant={variant}>{children}</S.ListContainer>;
};

interface ListItemProps {
  title: string;
  description: string;
  buttonText: string;
  buttonVariant?: ButtonProps["variant"];
  onClick: () => void;
  isDanger?: boolean;
}

export const ListItem: React.FC<ListItemProps> = ({
  title,
  description,
  buttonText,
  buttonVariant = "outline",
  onClick,
  isDanger = false,
}) => {
  return (
    <S.ListItemContainer>
      <Flex direction="column" gap={4} style={{ paddingRight: 16 }}>
        <Text
          variant="baseMedium"
          style={{ color: isDanger ? colors.danger : colors.textMain }}
        >
          {title}
        </Text>
        <Text variant="smallRegular" color="textMuted">
          {description}
        </Text>
      </Flex>
      <Button
        variant={buttonVariant}
        onClick={onClick}
        style={{ flexShrink: 0 }}
      >
        {buttonText}
      </Button>
    </S.ListItemContainer>
  );
};
