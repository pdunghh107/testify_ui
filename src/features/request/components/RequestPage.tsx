import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { Flex } from "@/components/layout/flex/Flex";
import { PageLayout } from "@/components/layout/PageLayout";
import { useRequestTabStore } from "@/features/workspace/store/requestTabStore";

import { usePipelineSSE } from "../hooks/usePipelineSSE";
import { RequestAddressBar } from "./RequestAddressBar";
import { RequestTabs } from "./RequestTabs";
import { ResponsePanel } from "./ResponsePanel";

export interface KeyValueRow {
  key: string;
  value: string;
  enabled: boolean;
}

export interface ApiRequestFormValues {
  method: string;
  url: string;
  ruleConfigCode: string;
  params: KeyValueRow[];
  headers: KeyValueRow[];
  body: string;
}

export function RequestPage({ tabId }: { tabId?: string }) {
  const { tabs, updateTab } = useRequestTabStore();
  const currentTab = tabs.find((t) => t.id === tabId);

  // Truyền dữ liệu khởi tạo từ tab vào hook (nếu có) để phục hồi UI
  const { startPipeline, isLoading, progress, logs, results } =
    usePipelineSSE(currentTab);

  const methods = useForm<ApiRequestFormValues>({
    defaultValues: {
      method: currentTab?.method || "POST",
      url: currentTab?.url || "http://localhost:9002/api/users",
      ruleConfigCode: currentTab?.ruleConfigCode || "",
      params: currentTab?.params?.length
        ? currentTab.params
        : [{ key: "", value: "", enabled: true }],
      headers: currentTab?.headers?.length
        ? currentTab.headers
        : [{ key: "Content-Type", value: "application/json", enabled: true }],
      body: currentTab?.body || "",
    },
  });

  // Tự động lưu state đang gõ vào LocalStorage (thông qua Zustand)
  useEffect(() => {
    if (!tabId) return;
    // eslint-disable-next-line react-hooks/incompatible-library
    const subscription = methods.watch((value) => {
      // Lọc bỏ undefined trước khi update
      const safeData = JSON.parse(JSON.stringify(value));
      updateTab(tabId, safeData);
    });
    return () => subscription.unsubscribe();
  }, [methods, methods.watch, tabId, updateTab]);

  // Đồng bộ kết quả test vào Tab Store để khi F5 không bị mất
  useEffect(() => {
    if (tabId) {
      updateTab(tabId, { logs, results, progress, isLoading });
    }
  }, [logs, results, progress, isLoading, tabId, updateTab]);

  const onSubmit = async (data: ApiRequestFormValues) => {
    // Build headers
    const headersConfig: Record<string, string> = {};
    data.headers.forEach((h) => {
      if (h.enabled && h.key) headersConfig[h.key] = h.value;
    });

    // Build params
    const paramsConfig: Record<string, string> = {};
    data.params.forEach((p) => {
      if (p.enabled && p.key) paramsConfig[p.key] = p.value;
    });

    let parsedBody = undefined;
    if (data.body) {
      try {
        parsedBody = JSON.parse(data.body);
      } catch {
        parsedBody = data.body;
      }
    }

    const payload: Record<string, unknown> = {
      method: data.method,
      url: data.url,
      headers: headersConfig,
    };

    let targetEndpoint = "http://localhost:9002/api/v1/permutations/run-stream";

    if (data.ruleConfigCode) {
      // Validate rule compatibility before running
      try {
        const validateRes = await fetch("http://localhost:9002/api/v1/rules-runner/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            workspaceId: currentTab?.workspaceId,
            ruleConfigCode: data.ruleConfigCode,
            bodyTemplate: data.body
          })
        });
        
        if (validateRes.ok) {
           const validateJson = await validateRes.json();
           if (validateJson.status === "warning") {
              toast(validateJson.message, { 
                icon: "⚠️", 
                duration: 6000,
                style: {
                  background: '#fff3cd',
                  color: '#856404',
                  border: '1px solid #ffeeba'
                }
              });
           }
        }
      } catch (e) {
        console.error("Validation failed", e);
      }

      // Use the new RuleRunner logic
      targetEndpoint = "http://localhost:9002/api/v1/rules-runner/run-stream";
      payload.ruleConfigCode = data.ruleConfigCode;
    } else {
      // Fallback to old legacy permutation
      payload.payload = parsedBody || {};
      payload.required_fields = [];
      payload.constraints = {};
      payload.generators = {};
    }

    // Bắn request tới endpoint run-stream của backend
    await startPipeline(targetEndpoint, payload);
  };

  return (
    <PageLayout
      title="API Runner"
      subtitle="Thử nghiệm và giám sát tiến trình hoán vị Payload theo thời gian thực."
      content={
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            style={{ width: "100%", height: "100%" }}
          >
            <Flex direction="column" gap={16}>
              <RequestAddressBar isLoading={isLoading} />

              <Flex
                gap={16}
                style={{ height: "calc(100vh - 250px)", minHeight: "500px" }}
              >
                {/* Left panel: Request configuration */}
                <Flex
                  direction="column"
                  flex={1}
                  style={{ borderRight: "1px solid #eee", paddingRight: 16 }}
                >
                  <RequestTabs />
                </Flex>

                {/* Right panel: Response & Monitoring */}
                <Flex direction="column" flex={1}>
                  <ResponsePanel
                    isLoading={isLoading}
                    progress={progress}
                    logs={logs}
                    results={results}
                  />
                </Flex>
              </Flex>
            </Flex>
          </form>
        </FormProvider>
      }
    />
  );
}
