import { fetchEventSource } from "@microsoft/fetch-event-source";
import { useCallback, useEffect, useState } from "react";

import type { LogEntry } from "../components/LiveConsole";
import type { TestCaseResult } from "../components/TestCasesResultTable";

interface UsePipelineSSEReturn {
  startPipeline: (
    url: string,
    payload: Record<string, unknown>,
  ) => Promise<void>;
  isLoading: boolean;
  progress: {
    current: number;
    total: number;
    hasError: boolean;
  };
  logs: LogEntry[];
  results: TestCaseResult[];
}

export function usePipelineSSE(initialData?: any): UsePipelineSSEReturn {
  const [isLoading, setIsLoading] = useState(initialData?.isLoading || false);
  const [logs, setLogs] = useState<LogEntry[]>(initialData?.logs || []);
  const [results, setResults] = useState<TestCaseResult[]>(
    initialData?.results || [],
  );
  const [progress, setProgress] = useState(
    initialData?.progress || { current: 0, total: 0, hasError: false },
  );

  // Update states if initialData changes (like switching tabs)
  useEffect(() => {
    if (initialData) {
      setIsLoading(initialData.isLoading || false);
      setLogs(initialData.logs || []);
      setResults(initialData.results || []);
      setProgress(
        initialData.progress || { current: 0, total: 0, hasError: false },
      );
    }
  }, [initialData?.id]); // Only run when tab ID changes

  const addLog = useCallback(
    (msg: string, type: "info" | "success" | "error" | "warning" = "info") => {
      setLogs((prev) => [
        ...prev,
        {
          id: Math.random().toString(36).substr(2, 9),
          timestamp: new Date().toLocaleTimeString(),
          message: msg,
          type,
        },
      ]);
    },
    [],
  );

  const startPipeline = async (apiUrl: string, payload: any) => {
    setIsLoading(true);
    setLogs([]);
    setResults([]);
    setProgress({ current: 0, total: 0, hasError: false });

    addLog("Khởi tạo kết nối SSE tới Pipeline Engine...", "info");

    try {
      await fetchEventSource(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "text/event-stream",
        },
        body: JSON.stringify(payload),
        onmessage(event) {
          // Xử lý các event type từ backend
          if (event.event === "START") {
            const data = JSON.parse(event.data);
            setProgress((prev) => ({ ...prev, total: data.totalCases || 0 }));
            addLog(`Bắt đầu chạy ${data.totalCases} cases hoán vị...`, "info");
          } else if (event.event === "LOG_EVENT") {
            const data = JSON.parse(event.data);

            // Thêm vào Log Console
            const isError = data.status >= 400 || data.status === 0;
            addLog(
              `[Case ${data.caseId}] ${data.method} ${data.url} - Status: ${data.status} (${data.timeMs}ms)`,
              isError ? "error" : "success",
            );

            // Cập nhật Progress
            setProgress((prev) => ({
              ...prev,
              current: prev.current + 1,
              hasError: prev.hasError || isError,
            }));

            // Thêm vào Result Table
            setResults((prev) => [
              ...prev,
              {
                id: data.caseId?.toString() || Math.random().toString(),
                name: `Case ${data.caseId}`,
                description: data.message,
                status: isError ? "error" : "success",
                statusCode: data.actualStatus,
                expectedStatus: data.expectedStatus,
                responseTime: data.timeMs,
                payload: data.payload,
                responseBody: data.responseBody,
              },
            ]);
          } else if (event.event === "COMPLETED") {
            addLog(`[DONE] ${event.data}`, "success");
            setIsLoading(false);
          }
        },
        onerror(err) {
          addLog(`Lỗi kết nối SSE: ${err}`, "error");
          setIsLoading(false);
          throw err; // Stop retrying on error
        },
        onclose() {
          addLog("Kết nối đã đóng.", "info");
          setIsLoading(false);
        },
      });
    } catch (err) {
      console.error("SSE Error:", err);
      setIsLoading(false);
    }
  };

  return {
    startPipeline,
    isLoading,
    progress,
    logs,
    results,
  };
}
