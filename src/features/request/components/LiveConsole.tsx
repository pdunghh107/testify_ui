import { useEffect, useRef } from "react";
import styled from "styled-components";

const ConsoleContainer = styled.div`
  background-color: #1e1e1e;
  color: #d4d4d4;
  font-family: "Courier New", Courier, monospace;
  font-size: 13px;
  padding: 16px;
  height: 100%;
  overflow-y: auto;
  border-radius: 6px;

  /* Custom Scrollbar for dark theme */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: #1e1e1e;
  }
  &::-webkit-scrollbar-thumb {
    background: #424242;
    border-radius: 4px;
  }
`;

const LogLine = styled.div<{
  $type?: "info" | "error" | "success" | "warning";
}>`
  margin-bottom: 4px;
  word-wrap: break-word;
  white-space: pre-wrap;

  color: ${({ $type }) => {
    switch ($type) {
      case "error":
        return "#f44336";
      case "success":
        return "#4caf50";
      case "warning":
        return "#ff9800";
      default:
        return "#d4d4d4";
    }
  }};
`;

export interface LogEntry {
  id: string;
  timestamp: string;
  message: string;
  type: "info" | "error" | "success" | "warning";
}

interface Props {
  logs: LogEntry[];
}

export function LiveConsole({ logs }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom only within the console container
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        top: containerRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [logs]);

  return (
    <ConsoleContainer ref={containerRef}>
      {logs.length === 0 ? (
        <LogLine $type="info" style={{ opacity: 0.5 }}>
          Waiting for logs...
        </LogLine>
      ) : (
        logs.map((log) => (
          <LogLine key={log.id} $type={log.type}>
            <span style={{ color: "#858585", marginRight: 8 }}>
              [{log.timestamp}]
            </span>
            {log.message}
          </LogLine>
        ))
      )}
    </ConsoleContainer>
  );
}
