import type {
  AvatarColumn,
  ActionColumn,
  BaseColumn,
  DataTableColumn,
  BadgeColumn,
  CheckboxColumn,
} from "./types";
import { Avatar } from "../../common/avatar";
import { Text } from "../../common/text";
import { Badge } from "../../common/badge";
import { Button } from "../../common/button";
import {
  Dropdown,
  DropdownItem,
  DropdownHeader,
  DropdownSeparator,
} from "../../overlay/dropdown";
import { Checkbox } from "../../common/checkbox/Checkbox";
import { Flex } from "../../layout/flex";
import { MoreVertical } from "lucide-react";
import {
  formatDate,
  formatCurrency,
  formatPercent,
} from "../../../utils/common-utils";

const getNestedValue = (obj: unknown, path: string): unknown => {
  return path.split(".").reduce((acc: any, part) => acc && acc[part], obj);
};

export const getCellValue = <T,>(
  row: T,
  colValue: BaseColumn<T>["value"],
): unknown => {
  if (!colValue) return undefined;
  if (typeof colValue === "function") return colValue(row);
  return getNestedValue(row, colValue as string);
};

export const AvatarCell = <T,>({
  row,
  col,
  value,
}: {
  row: T;
  col: AvatarColumn<T>;
  value: unknown;
}) => {
  const text = value ? String(value) : "Ẩn danh";
  const subtitleText = col.subtitle ? col.subtitle(row) : null;
  const isClickable = !!col.onNavigate || !!col.onClick;

  return (
    <Flex align="center" gap={12}>
      <Avatar name={text} size={36} />
      <div>
        <Text
          variant="baseSemibold"
          color={isClickable ? "primary" : "textMain"}
          style={{
            whiteSpace: "nowrap",
            cursor: isClickable ? "pointer" : "default",
          }}
          onClick={(e) => {
            if (!isClickable) return;
            e.stopPropagation();
            if (col.onNavigate) col.onNavigate(row);
            else if (col.onClick) col.onClick(row, 0);
          }}
          title={text}
        >
          {text}
        </Text>
        {subtitleText && (
          <Text
            variant="smallRegular"
            color="textMuted"
            style={{ marginTop: 2, display: "block" }}
          >
            {subtitleText}
          </Text>
        )}
      </div>
    </Flex>
  );
};

export const ActionCell = <T,>({
  row,
  col,
}: {
  row: T;
  col: ActionColumn<T>;
}) => {
  const visibleActions = col.actions.filter(
    (action) => !action.show || action.show(row),
  );
  if (visibleActions.length === 0) return <Text color="textMuted">---</Text>;

  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Dropdown
        trigger={
          <Button
            variant="ghost"
            leftIcon={<MoreVertical size={16} />}
            style={{ padding: "4px", width: "32px", height: "32px" }}
          />
        }
        content={(onClose) => (
          <>
            <DropdownHeader>Thao tác</DropdownHeader>
            <DropdownSeparator />
            {visibleActions.map((action) => (
              <DropdownItem
                key={action.id}
                icon={action.icon}
                variant={action.variant}
                onClick={() => {
                  action.onClick(row);
                  onClose();
                }}
              >
                {action.label}
              </DropdownItem>
            ))}
          </>
        )}
      />
    </div>
  );
};

export const BadgeCell = <T,>({
  value,
  col,
}: {
  value: unknown;
  col?: BadgeColumn<T>;
}) => {
  const stringVal = String(value);
  const config = col?.badgeConfig?.[stringVal];

  const label = config?.label ?? stringVal;
  const variant = config?.variant ?? "gray";

  return <Badge variant={variant}>{label}</Badge>;
};

export const DateCell = ({ value }: { value: unknown }) => {
  const formattedDate = formatDate(value as string | Date) || "---";
  return (
    <Text variant="baseMedium" color="textMuted">
      {formattedDate}
    </Text>
  );
};

export const TimeCell = ({ value }: { value: unknown }) => {
  const formattedTime = formatDate(value as string | Date, "HH:mm") || "---";
  return (
    <Text variant="baseMedium" color="textMuted">
      {formattedTime}
    </Text>
  );
};

export const DateTimeCell = ({ value }: { value: unknown }) => {
  const formattedDate =
    formatDate(value as string | Date, "HH:mm - dd/MM/yyyy") || "---";
  return (
    <Text variant="baseMedium" color="textMuted">
      {formattedDate}
    </Text>
  );
};

export const CurrencyCell = ({ value }: { value: unknown }) => (
  <Text variant="baseMedium" color="textMain">
    {formatCurrency(value as number | string)}
  </Text>
);

export const PercentCell = ({ value }: { value: unknown }) => (
  <Text variant="baseMedium" color="textMain">
    {formatPercent(value as number | string)}
  </Text>
);

export const BooleanCell = ({ value }: { value: unknown }) => (
  <Text variant="baseMedium" color="textMain">
    {value ? "Có" : "Không"}
  </Text>
);

export const TextMutedCell = ({ value }: { value: unknown }) => (
  <Text variant="baseMedium" color="textMuted">
    {String(value)}
  </Text>
);

export const CheckboxCell = <T,>({
  row,
  col,
  value,
}: {
  row: T;
  col: CheckboxColumn<T>;
  value: unknown;
}) => {
  const isChecked = Boolean(value);
  return (
    <Checkbox
      checked={isChecked}
      disabled={col.readOnly}
      onChange={(e) => {
        col.onCheckboxChange?.(row, (e.target as HTMLInputElement).checked);
      }}
    />
  );
};

export const DefaultCell = <T,>({
  col,
  value,
}: {
  col: DataTableColumn<T>;
  value: unknown;
}) => {
  const isClickable = !!(col as any).onClick;
  return (
    <Text
      variant="baseMedium"
      color={isClickable ? "primary" : "textMain"}
      style={{ cursor: isClickable ? "pointer" : "default" }}
    >
      {value as React.ReactNode}
    </Text>
  );
};

export const renderCellContent = <T,>(
  col: DataTableColumn<T>,
  row: T,
  value: unknown,
): React.ReactNode => {
  switch (col.type) {
    case "avatar":
      return <AvatarCell row={row} col={col} value={value} />;
    case "action":
      return <ActionCell row={row} col={col} />;
    case "badge":
      return <BadgeCell value={value} col={col as BadgeColumn<T>} />;
    case "date":
      return <DateCell value={value} />;
    case "time":
      return <TimeCell value={value} />;
    // case "datetime": // Khuyên dùng cho CRM (Lịch sử hoạt động)
    //   return <DateTimeCell value={value} />;
    case "currency":
      return <CurrencyCell value={value} />;
    case "percent":
      return <PercentCell value={value} />;
    case "boolean":
      return <BooleanCell value={value} />;
    case "checkbox":
      return <CheckboxCell row={row} col={col} value={value} />;
    default:
      return <DefaultCell col={col} value={value} />;
  }
};
