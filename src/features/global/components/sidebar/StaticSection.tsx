import { Sidebar } from "@/components/layout/sidebar";

import { SIDEBAR_TOOLS } from "../../constants/sidebarConfig";

export const StaticSection = () => {
  return (
    <Sidebar.Group>
      <Sidebar.GroupLabel>Cấu hình</Sidebar.GroupLabel>
      {SIDEBAR_TOOLS.map((tool) => (
        <Sidebar.Item key={tool.href} icon={tool.icon} href={tool.href}>
          {tool.title}
        </Sidebar.Item>
      ))}
    </Sidebar.Group>
  );
};
