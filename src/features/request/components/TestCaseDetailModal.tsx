import styled from "styled-components";

import { Text } from "../../../components/common/text";
import { Flex } from "../../../components/layout/flex";
import { Modal } from "../../../components/overlay/modal/Modal";
import type { TestCaseResult } from "./TestCasesResultTable";

const CodeBlock = styled.pre`
  background: #1e1e1e;
  color: #d4d4d4;
  padding: 12px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 13px;
  overflow: auto;
  max-height: 250px;
  white-space: pre-wrap;
  word-break: break-all;
  margin-top: 8px;
  margin-bottom: 16px;
`;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  selectedCase: TestCaseResult | null;
}

export function TestCaseDetailModal({ isOpen, onClose, selectedCase }: Props) {
  const formatJson = (str?: string) => {
    if (!str) return "N/A";
    try {
      const obj = JSON.parse(str);
      return JSON.stringify(obj, null, 2);
    } catch {
      return str;
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        selectedCase ? `Chi tiết: ${selectedCase.name}` : "Chi tiết Test Case"
      }
      showX={true}
    >
      {selectedCase && (
        <Flex direction="column" gap={12}>
          <div>
            <Text variant="smallSemibold">Description:</Text>
            <Text variant="baseRegular" style={{ marginTop: 4 }}>
              {selectedCase.description}
            </Text>
          </div>

          <Flex gap={16} align="center">
            <Text variant="smallSemibold">
              Actual Status:{" "}
              <span
                style={{
                  color:
                    selectedCase.statusCode >= 400 ||
                    selectedCase.statusCode === 0
                      ? "#ef4444"
                      : "#10b981",
                }}
              >
                {selectedCase.statusCode}
              </span>
            </Text>
            <Text variant="smallSemibold">
              Expected Status: {selectedCase.expectedStatus}
            </Text>
            <Text variant="smallSemibold">
              Time: {selectedCase.responseTime} ms
            </Text>
          </Flex>

          <div>
            <Text variant="smallSemibold">Request Payload:</Text>
            <CodeBlock>{formatJson(selectedCase.payload)}</CodeBlock>
          </div>

          <div>
            <Text variant="smallSemibold">Response Body:</Text>
            <CodeBlock>{formatJson(selectedCase.responseBody)}</CodeBlock>
          </div>
        </Flex>
      )}
    </Modal>
  );
}
