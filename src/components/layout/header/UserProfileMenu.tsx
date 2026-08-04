import { useNavigate } from "@tanstack/react-router";
import { LogOut, User } from "lucide-react";

import { Avatar } from "@/components/common/avatar";
import { Flex } from "@/components/layout/flex/Flex";
import {
  Dropdown,
  DropdownHeader,
  DropdownItem,
  DropdownSeparator,
} from "@/components/overlay/dropdown";
import { useLogout } from "@/features/auth/api/useLogout";
import { useAuthStore } from "@/store/authStore";

export function UserProfileMenu() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const { mutate: logoutApi } = useLogout();

  const handleLogout = () => {
    logoutApi();
  };

  const displayName = user?.fullName || "Người dùng";

  return (
    <Flex align="center">
      <Dropdown
        placement="bottom-end"
        trigger={<Avatar name={displayName} size={32} />}
        content={(onClose) => (
          <>
            <DropdownHeader>
              <div style={{ fontWeight: 600 }}>{displayName}</div>
              <div
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  marginTop: 2,
                }}
              >
                {user?.email || "Chưa cập nhật email"}
              </div>
            </DropdownHeader>
            <DropdownSeparator />
            <DropdownItem
              icon={User}
              onClick={() => {
                navigate({ to: "/profile" });
                onClose();
              }}
            >
              Hồ sơ cá nhân
            </DropdownItem>
            <DropdownSeparator />
            <DropdownItem
              icon={LogOut}
              variant="danger"
              onClick={() => {
                handleLogout();
                onClose();
              }}
            >
              Đăng xuất
            </DropdownItem>
          </>
        )}
      />
    </Flex>
  );
}
