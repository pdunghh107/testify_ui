import React, { type ReactNode } from "react";
import styled from "styled-components";
import { Grid } from "@/components/layout/grid";
import { Text } from "@/components/common/text";
import { colors } from "@/styles/colors";

/**
 * Cấu hình cho mỗi item trong DetailGrid.
 */
export interface DetailGridConfig<T> {
  label: string;
  dataKey?: keyof T;
  fallback?: string;
  colSpan?: number;
  hidden?: (value: any, record: T) => boolean;
  render?: (value: any, record: T) => ReactNode;
}

/**
 * Cấu hình Props cho component DetailGrid.
 */
export interface DetailGridProps<T> {
  title: string;
  icon?: ReactNode;
  data: T;
  items: DetailGridConfig<T>[];
  columns?: number;
}

const DetailSection = styled.div`
  margin-bottom: 24px;
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${colors.primary};
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid ${colors.borderLight};
`;

const InfoItem = styled.div<{ $colSpan?: number }>`
  display: flex;
  flex-direction: column;
  gap: 4px;
  ${({ $colSpan }) => ($colSpan ? `grid-column: span ${$colSpan};` : "")}
`;

/**
 * Component DetailGrid dùng để hiển thị chi tiết dữ liệu (dạng text, badge, link...)
 * trên một lưới linh hoạt (thường dùng trong Drawer hoặc Modal chi tiết).
 *
 * @example
 * ```tsx
 * const config = [
 *   { label: 'Họ tên', dataKey: 'fullName' },
 *   { label: 'Trạng thái', dataKey: 'status', render: (val) => <Badge>{val}</Badge> }
 * ];
 * 
 * <DetailGrid title="Thông tin cơ bản" data={user} items={config} columns={2} />
 * ```
 */
export function DetailGrid<T>({
  title,
  icon,
  data,
  items,
  columns = 2,
}: DetailGridProps<T>) {
  return (
    <DetailSection>
      <SectionHeader>
        {icon}
        <Text as="h4" variant="baseSemibold" color="primary">
          {title}
        </Text>
      </SectionHeader>
      <Grid columns={columns} gap={16}>
        {items.map((item, index) => {
          let value: any = item.dataKey ? data[item.dataKey] : undefined;

          if (item.hidden && item.hidden(value, data)) {
            return null;
          }

          let displayValue: ReactNode = item.fallback || "Chưa cập nhật";
          if (item.render) {
            displayValue = item.render(value, data);
          } else if (value !== undefined && value !== null && value !== "") {
            displayValue = String(value);
          }

          return (
            <InfoItem
              key={`${String(item.dataKey)}-${index}`}
              $colSpan={item.colSpan}
            >
              <Text variant="smallRegular" color="textMuted">
                {item.label}
              </Text>
              {React.isValidElement(displayValue) ? (
                displayValue
              ) : (
                <Text variant="baseMedium" color="textMain">
                  {displayValue}
                </Text>
              )}
            </InfoItem>
          );
        })}
      </Grid>
    </DetailSection>
  );
}
