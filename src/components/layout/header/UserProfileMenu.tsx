import { useState, useRef } from "react";
import { LogOut } from "lucide-react";

import { Flex } from "../flex/Flex";
import { colors } from "../../../styles/colors";
import { useClickOutside } from "../../../hooks/useClickOutside";

import { IconButton } from "../../common/button";
import { Avatar } from "../../common/avatar";

import { useAuthStore } from "../../../store/authStore";
import { useLogout } from "../../../features/auth/api/useLogout";

export function UserProfileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useClickOutside(menuRef, () => setIsOpen(false));

  const { user } = useAuthStore();
  const { mutate: logoutApi } = useLogout();

  const handleLogout = () => {
    logoutApi();
  };

  const displayName = user?.fullName || "Người dùng";

  return (
    <Flex align="center" gap={12} ref={menuRef}>
      <Avatar name={displayName} size={32} onClick={() => setIsOpen(!isOpen)} />

      <div style={{ width: 1, height: 24, background: colors.borderLight }} />

      <IconButton
        icon={<LogOut size={16} />}
        variant="ghost"
        onClick={handleLogout}
        title="Đăng xuất"
        aria-label="Đăng xuất"
        style={{ color: colors.danger }}
      />
    </Flex>
  );
}
