import { LogOut } from "lucide-react";

import { Sidebar } from "@/components/layout/sidebar";

export interface LogoutSectionProps {
  onClick: () => void;
}
export const LogoutSection = ({ onClick }: LogoutSectionProps) => {
  return (
    <Sidebar.Footer>
      <Sidebar.Item icon={LogOut} onClick={onClick}>
        Đăng xuất
      </Sidebar.Item>
    </Sidebar.Footer>
  );
};
