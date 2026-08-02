import { useNavigate } from "@tanstack/react-router";
import styled from "styled-components";

import {
  SelectDropdown,
  SelectOption,
  SelectRoot,
  SelectTrigger,
} from "@/components/form/Select";
import { useWorkspaces } from "@/features/workspace/api/useWorkspaceQueries";
import { useProjectStore } from "@/store/workspaceStore";

const SelectorContainer = styled.div`
  width: 250px;
`;

export const WorkspaceSelector = () => {
  const { data: workspaces = [] } = useWorkspaces();
  const { activeWorkspaceId, setActiveWorkspace } = useProjectStore();
  const navigate = useNavigate();

  const options = workspaces.map((p) => ({ label: p.name, value: p.id }));

  const handleChange = (val: string | string[]) => {
    const id = Array.isArray(val) ? val[0] : val;
    if (id) {
      setActiveWorkspace(id);
      navigate({
        to: "/workspaces/$workspaceId",
        params: { workspaceId: id },
      });
    }
  };

  return (
    <SelectorContainer>
      <SelectRoot
        value={activeWorkspaceId || ""}
        onChange={handleChange}
        options={options}
      >
        <SelectTrigger placeholder="Chọn Workspace..." size="sm" />
        <SelectDropdown>
          {options.map((opt, index) => (
            <SelectOption key={opt.value} value={opt.value} index={index}>
              {opt.label}
            </SelectOption>
          ))}
        </SelectDropdown>
      </SelectRoot>
    </SelectorContainer>
  );
};
