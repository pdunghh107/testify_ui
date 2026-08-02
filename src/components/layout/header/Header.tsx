import { Menu } from "lucide-react";
import styled from "styled-components";

import { WorkspaceSelector } from "@/features/workspace/components/WorkspaceSelector";
import { colors } from "@/styles/colors";

import { IconButton } from "../../../components/common/button/Button";
import { Flex } from "../flex/Flex";
import { UserProfileMenu } from "./UserProfileMenu";

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
        <WorkspaceSelector />
      </Flex>

      <Flex style={{ flex: 1 }} />

      <Flex align="center" gap={8}>
        <UserProfileMenu />
      </Flex>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  flex-shrink: 0;
  align-items: center;

  padding: 4px 24px;
  border-bottom: 1px solid ${colors.borderLight};

  background: ${colors.backgroundCard};
`;

const MobileMenuButton = styled.div`
  display: flex;

  @media (width >= 1025px) {
    display: none;
  }
`;
