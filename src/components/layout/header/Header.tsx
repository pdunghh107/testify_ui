import { Menu } from "lucide-react";

import { Flex } from "../flex/Flex";
import { IconButton } from "../../../components/common/button/Button";
import { UserProfileMenu } from "./UserProfileMenu";
import styled from "styled-components";
import { colors } from "@/styles/colors";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  return (
    <HeaderWrapper>
      <Flex align="center">
        <MobileMenuButton>
          <IconButton
            icon={<Menu size={16} />}
            aria-label="Bật/tắt Sidebar"
            variant="ghost"
            onClick={onToggleSidebar}
          />
        </MobileMenuButton>
      </Flex>

      <Flex style={{ flex: 1 }} />

      <Flex align="center" gap={8}>
        <UserProfileMenu />
      </Flex>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  background: ${colors.backgroundCard};
  border-bottom: 1px solid ${colors.borderLight};
  display: flex;
  align-items: center;
  padding: 4px 24px;
  flex-shrink: 0;
`;

const MobileMenuButton = styled.div`
  display: flex;
  @media (min-width: 1025px) {
    display: none;
  }
`;
