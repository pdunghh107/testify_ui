import { Filter } from "lucide-react";
import React, { useState } from "react";
import styled from "styled-components";

import { Button } from "@/components/common/button/Button";
import { Modal } from "@/components/overlay/modal/Modal";
import { useMediaQuery } from "@/hooks/useMediaQuery";

/**
 * Cấu hình Props cho DataViewLayout.
 */
export interface DataViewLayoutProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  toolbar?: React.ReactNode;
  advancedFilter?: React.ReactNode;
  filterChips?: React.ReactNode;
  table: React.ReactNode;
  pagination?: React.ReactNode;
}

import { PageLayout } from "@/components/layout/PageLayout";

const TableBox = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const TableScrollArea = styled.div`
  flex: 1;
  overflow: hidden;
`;

const PaginationSection = styled.div`
  padding: 0 16px;
`;

/**
 * Component Layout chuẩn hóa cho các màn hình hiển thị dữ liệu (thường là Data Table).
 * Cung cấp sẵn các khu vực cho title, bộ lọc (filter), toolbar, bảng dữ liệu và phân trang.
 * Tự động responsive: biến bộ lọc thành dạng Modal trên giao diện mobile.
 *
 * @example
 * ```tsx
 * <DataViewLayout 
 *   title="Danh sách người dùng"
 *   advancedFilter={<UserFilterForm />}
 *   table={<DataTable columns={cols} data={data} />}
 *   pagination={<Pagination totalPages={10} currentPage={1} />}
 * />
 * ```
 */
export function DataViewLayout({
  title,
  subtitle,
  toolbar,
  advancedFilter,
  filterChips,
  table,
  pagination,
}: DataViewLayoutProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  return (
    <PageLayout
      title={title}
      subtitle={subtitle}
      toolbar={toolbar}
      content={
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 16,
            height: "100%",
            overflow: "hidden",
          }}
        >
          {advancedFilter &&
            (isMobile ? (
              <>
                <div>
                  <Button
                    variant="outline"
                    leftIcon={<Filter size={16} />}
                    onClick={() => setIsFilterModalOpen(true)}
                  >
                    Bộ lọc
                  </Button>
                </div>
                <Modal
                  isOpen={isFilterModalOpen}
                  onClose={() => setIsFilterModalOpen(false)}
                  title="Bộ lọc dữ liệu"
                  icon={<Filter size={20} />}
                  showX={true}
                  footer={
                    <Button
                      variant="primary"
                      onClick={() => setIsFilterModalOpen(false)}
                      style={{ width: "100%" }}
                    >
                      Áp dụng
                    </Button>
                  }
                >
                  {advancedFilter}
                </Modal>
              </>
            ) : (
              <div>{advancedFilter}</div>
            ))}

          {filterChips}

          <TableBox>
            <TableScrollArea>{table}</TableScrollArea>

            {pagination && <PaginationSection>{pagination}</PaginationSection>}
          </TableBox>
        </div>
      }
    />
  );
}
