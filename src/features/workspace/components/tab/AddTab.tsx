import { Plus } from "lucide-react";

import { IconButton } from "@/components/common/button";

export const AddTab = ({ onClick }: { onClick: () => void }) => {
  return (
    <IconButton
      icon={<Plus size={16} />}
      variant="ghost"
      onClick={onClick}
      aria-label="Thêm Tab mới"
      style={{ padding: 4, flexShrink: 0 }}
    />
  );
};
