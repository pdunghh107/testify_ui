import styled from "styled-components";
import { FilterChip } from "./FilterChip";
import type { FilterChipData } from "../../../hooks/useMappedFilterChips";
import { colors } from "../../../styles/colors";

interface ActiveFilterChipsProps {
  chips: FilterChipData[];
  onRemove: (key: string) => void;
  onClearAll: () => void;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
`;

const FilterLabel = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: ${colors.textMuted};
  margin-right: 4px;
`;

const ClearAllButton = styled.button`
  font-size: 13px;
  font-weight: 500;
  color: ${colors.danger};
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 8px;

  &:hover {
    text-decoration: underline;
  }
`;

export function ActiveFilterChips({
  chips,
  onRemove,
  onClearAll,
}: ActiveFilterChipsProps) {
  if (!chips || chips.length === 0) return null;

  return (
    <Container>
      <FilterLabel>Lọc theo:</FilterLabel>

      {chips.map((chip) => (
        <FilterChip
          key={chip.key}
          active={true}
          onRemove={() => onRemove(chip.key)}
        >
          <span>{chip.label}:</span>
          <span style={{ fontWeight: "normal", marginLeft: "2px" }}>
            {chip.displayValue}
          </span>
        </FilterChip>
      ))}

      {chips.length > 1 && (
        <ClearAllButton onClick={onClearAll}>Xóa tất cả</ClearAllButton>
      )}
    </Container>
  );
}
