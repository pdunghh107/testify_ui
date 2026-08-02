import { Loader2 } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

import { Tabs } from "../../../components/common/tabs";
import { Text } from "../../../components/common/text";
import { Flex } from "../../../components/layout/flex";
import { LiveConsole, type LogEntry } from "./LiveConsole";
import { ProgressBar } from "./ProgressBar";
import {
  type TestCaseResult,
  TestCasesResultTable,
} from "./TestCasesResultTable";

const Container = styled(Flex)`
  background: ${({ theme }) => theme.colors.backgroundCard};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
  height: 100%;
  overflow: hidden;
`;

const Header = styled(Flex)`
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderDefault};
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.backgroundHover};
`;

const Body = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

interface Props {
  isLoading: boolean;
  progress: {
    current: number;
    total: number;
    hasError: boolean;
  };
  logs: LogEntry[];
  results: TestCaseResult[];
}

export function ResponsePanel({ isLoading, progress, logs, results }: Props) {
  const [activeTab, setActiveTab] = useState("logs");

  return (
    <Container direction="column">
      <Header justify="space-between" align="center">
        <Flex gap={12} align="center">
          <Text variant="baseSemibold">Execution Monitor</Text>
          {isLoading && (
            <Loader2 className="animate-spin" size={16} color="#6366f1" />
          )}
        </Flex>
      </Header>

      {/* Progress Bar (Always visible during execution) */}
      {(isLoading || progress.total > 0) && (
        <div
          style={{ padding: "12px 16px", borderBottom: "1px solid #e5e7eb" }}
        >
          <ProgressBar
            current={progress.current}
            total={progress.total}
            hasError={progress.hasError}
          />
        </div>
      )}

      <Body>
        <Tabs.Root
          value={activeTab}
          onChange={setActiveTab}
          style={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          <div style={{ padding: "0 16px" }}>
            <Tabs.List>
              <Tabs.Trigger value="logs">Live Logs</Tabs.Trigger>
              <Tabs.Trigger value="results">Test Results</Tabs.Trigger>
            </Tabs.List>
          </div>

          <div style={{ flex: 1, overflow: "hidden", padding: 16 }}>
            <Tabs.Panel value="logs" style={{ height: "100%" }}>
              <LiveConsole logs={logs} />
            </Tabs.Panel>

            <Tabs.Panel
              value="results"
              style={{ height: "100%", overflowY: "auto" }}
            >
              <TestCasesResultTable results={results} />
            </Tabs.Panel>
          </div>
        </Tabs.Root>
      </Body>
    </Container>
  );
}
