import { useState } from "react";

import { Badge } from "../../../components/common/badge/Badge";
import { Text } from "../../../components/common/text";
import { DataTable } from "../../../components/data/data-table/DataTable";
import type { DataTableColumn } from "../../../components/data/data-table/types";
import { Flex } from "../../../components/layout/flex";
import { TestCaseDetailModal } from "./TestCaseDetailModal";

export interface TestCaseResult {
  id: string;
  name: string;
  description?: string;
  status: "success" | "error" | "pending";
  responseTime: number; // ms
  statusCode: number;
  expectedStatus?: number;
  payload?: string;
  responseBody?: string;
}

interface Props {
  results: TestCaseResult[];
}

export function TestCasesResultTable({ results }: Props) {
  const [selectedCase, setSelectedCase] = useState<TestCaseResult | null>(null);

  const columns: DataTableColumn<TestCaseResult>[] = [
    {
      header: "Test Case",
      value: "name",
      render: (row) => (
        <div>
          <Text variant="smallSemibold">{row.name}</Text>
          <Text
            variant="smallRegular"
            color="textMuted"
            style={{
              display: "block",
              marginTop: 4,
              maxWidth: 300,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {row.description}
          </Text>
        </div>
      ),
      minWidth: 250,
    },
    {
      header: "Status",
      value: "status",
      render: (row) => (
        <Badge
          variant={
            row.status === "success"
              ? "success"
              : row.status === "error"
                ? "error"
                : "warning"
          }
          fill="light"
        >
          {row.status.toUpperCase()}
        </Badge>
      ),
      minWidth: 100,
    },
    {
      header: "Actual Status",
      value: "statusCode",
      render: (row) => (
        <Text
          variant="smallSemibold"
          color={
            row.statusCode >= 400 || row.statusCode === 0 ? "danger" : "success"
          }
        >
          {row.statusCode}
        </Text>
      ),
      minWidth: 120,
    },
    {
      header: "Expected Status",
      value: "expectedStatus",
      render: (row) => <span>{row.expectedStatus || "N/A"}</span>,
      minWidth: 140,
    },
    {
      header: "Time (ms)",
      value: "responseTime",
      render: (row) => <span>{row.responseTime} ms</span>,
      minWidth: 100,
    },
  ];

  if (results.length === 0) {
    return (
      <Flex justify="center" align="center" style={{ height: "100%" }}>
        <Text variant="baseRegular" color="textMuted">
          Chưa có kết quả test
        </Text>
      </Flex>
    );
  }

  const handleRowClick = (res: TestCaseResult) => {
    setSelectedCase(res);
  };

  const closeModal = () => {
    setSelectedCase(null);
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={results}
        rowKey="id"
        onRowClick={handleRowClick}
        maxHeight="100%"
        emptyText="Chưa có kết quả test"
      />

      {/* Modal chi tiết Test Case */}
      <TestCaseDetailModal
        isOpen={!!selectedCase}
        onClose={closeModal}
        selectedCase={selectedCase}
      />
    </>
  );
}
