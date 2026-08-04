import { LogOut, Menu } from "lucide-react";
import styled from "styled-components";

import { useLogout } from "@/features/auth/api/useLogout";
import { WorkspaceSelector } from "@/features/workspace/components/WorkspaceSelector";
import { colors } from "@/styles/colors";

import { IconButton } from "../../../components/common/button/Button";
import { Flex } from "../flex/Flex";
import { UserProfileMenu } from "./UserProfileMenu";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header = ({ onToggleSidebar }: HeaderProps) => {
  const { mutate: logoutApi } = useLogout();

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

      <Flex flex={1} />

      <Flex align="center" gap={8}>
        <UserProfileMenu />
        <Seperator />
        <IconButton
          icon={<LogOut size={16} />}
          variant="ghost"
          onClick={() => logoutApi()}
          title="Đăng xuất"
          aria-label="Đăng xuất"
          style={{ color: colors.danger }}
        />
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

const Seperator = styled.div`
  width: 1px;
  height: 24px;
  background: ${colors.borderLight};
`;
