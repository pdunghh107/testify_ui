import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

import { Flex } from "@/components/layout/flex";
import { useRequestDetail } from "@/features/request/api/useRequestQueries";
import { RequestPage } from "@/features/request/components/RequestPage";
import { useRequestTabStore } from "@/features/workspace/store/requestTabStore";

export const Route = createFileRoute("/_layout/requests/$requestId")({
  component: RequestRouteWrapper,
});

function RequestRouteWrapper() {
  const { requestId } = Route.useParams();
  const { data: requestDetail, isLoading } = useRequestDetail(requestId);

  const tabs = useRequestTabStore((state) => state.tabs);
  const addTab = useRequestTabStore((state) => state.addTab);
  const setActiveTab = useRequestTabStore((state) => state.setActiveTab);
  // const updateTab = useRequestTabStore((state) => state.updateTab);
  const activeTabId = useRequestTabStore((state) => state.activeTabId);

  useEffect(() => {
    if (requestDetail) {
      const existingTab = tabs.find((t) => t.id === requestId);

      const headersList: Array<{
        id: string;
        key: string;
        value: string;
        enabled: boolean;
      }> = Object.entries(requestDetail.headers || {}).map(([key, value]) => ({
        id: crypto.randomUUID(),
        key,
        value: value as string,
        enabled: true,
      }));

      const tabData = {
        id: requestId,
        title: requestDetail.name,
        method: requestDetail.method,
        url: requestDetail.url,
        body: requestDetail.bodyTemplate,
        ruleConfigCode: requestDetail.defaultRuleId || "", // We mapped defaultRuleId to ruleConfigCode in backend earlier? Actually the backend still returns defaultRuleId probably
        headers:
          headersList.length > 0
            ? headersList
            : [
                {
                  id: crypto.randomUUID(),
                  key: "Content-Type",
                  value: "application/json",
                  enabled: true,
                },
              ],
      };

      if (!existingTab) {
        addTab(tabData);
      } else {
        // Just activate, maybe update if needed, but usually we don't overwrite user's unsaved changes.
        // Or we update it if they just opened it.
        setActiveTab(requestId);
      }
    }
  }, [requestDetail, requestId, tabs, addTab, setActiveTab]);

  // Also if existingTab exists, make sure it is active even before fetching is done
  useEffect(() => {
    if (tabs.find((t) => t.id === requestId)) {
      setActiveTab(requestId);
    }
  }, [requestId, tabs, setActiveTab]);

  if (isLoading && !tabs.find((t) => t.id === requestId)) {
    return (
      <Flex
        align="center"
        justify="center"
        style={{ height: "100%", width: "100%" }}
      >
        <Loader2 className="animate-spin" size={32} />
      </Flex>
    );
  }

  return <RequestPage tabId={activeTabId || requestId} />;
}
