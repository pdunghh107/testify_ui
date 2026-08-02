import { useEffect, useState } from "react";

import { Tabs } from "../../../components/common/tabs";
import { Text } from "../../../components/common/text";
import { SelectField } from "../../../components/form/SelectField";
import { TextareaField } from "../../../components/form/TextareaField";
import { Flex } from "../../../components/layout/flex";
import type { RuleConfig } from "../../config/api/ruleConfigApi";
import { ruleConfigApi } from "../../config/api/ruleConfigApi";
import { KeyValueTable } from "./KeyValueTable";

export function RequestTabs() {
  const [activeTab, setActiveTab] = useState("rules");
  const [rules, setRules] = useState<RuleConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    ruleConfigApi
      .getAll()
      .then(setRules)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Flex direction="column" flex={1} style={{ minHeight: 0 }}>
      <Tabs.Root value={activeTab} onChange={setActiveTab}>
        <Tabs.List>
          <Tabs.Trigger value="rules">Rules</Tabs.Trigger>
          <Tabs.Trigger value="params">Params</Tabs.Trigger>
          <Tabs.Trigger value="headers">Headers</Tabs.Trigger>
          <Tabs.Trigger value="body">Body (Legacy)</Tabs.Trigger>
        </Tabs.List>

        <div style={{ flex: 1, overflowY: "auto", marginTop: 16 }}>
          <Tabs.Panel value="rules">
            <Flex direction="column" gap={16}>
              <Text variant="baseRegular">
                Chọn cấu hình Rule để hệ thống tự động sinh dữ liệu Test:
              </Text>
              <div
                style={{
                  padding: 16,
                  border: "1px dashed #d9d9d9",
                  borderRadius: 8,
                }}
              >
                {loading ? (
                  <Text variant="smallRegular">Đang tải...</Text>
                ) : (
                  <SelectField
                    name="ruleConfigCode"
                    placeholder="-- Chọn Rule Config --"
                    options={[
                      { label: "Không sử dụng Rule Config", value: "" },
                      ...rules.map((r) => ({
                        label: r.name,
                        value: r.configCode,
                      })),
                    ]}
                  />
                )}
                <Text
                  variant="smallRegular"
                  color="textMuted"
                  style={{ marginTop: 8, display: "block" }}
                >
                  Nếu chọn Rule Config, tính năng tự động sinh Test Case sẽ được
                  kích hoạt. Bạn không cần điền JSON Body nữa.
                </Text>
              </div>
            </Flex>
          </Tabs.Panel>

          <Tabs.Panel value="params">
            <KeyValueTable name="params" />
          </Tabs.Panel>

          <Tabs.Panel value="headers">
            <KeyValueTable name="headers" />
          </Tabs.Panel>

          <Tabs.Panel value="body">
            <TextareaField
              name="body"
              placeholder="Nhập JSON body (chỉ dùng khi không dùng Rule Config)..."
              style={{ minHeight: 300, fontFamily: "monospace" }}
            />
          </Tabs.Panel>
        </div>
      </Tabs.Root>
    </Flex>
  );
}
