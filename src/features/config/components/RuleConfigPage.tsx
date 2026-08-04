import { useEffect, useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { DataViewLayout } from "../../../components/layout/DataViewLayout";
import { DataTable } from "../../../components/data/data-table/DataTable";
import type { DataTableColumn } from "../../../components/data/data-table/types";
import { type RuleConfig, ruleConfigApi } from "../api/ruleConfigApi";
import { Button, IconButton } from "../../../components/common/button";
import { Plus, Edit, Trash2, RefreshCw } from "lucide-react";
import { Flex } from "../../../components/layout/flex";
import { Text } from "../../../components/common/text";
import { Modal } from "../../../components/overlay/modal/Modal";
import { InputField } from "../../../components/form/InputField";
import { RuleBuilder } from "./RuleBuilder";
import toast from "react-hot-toast";
import { Tabs } from "../../../components/common/tabs";
import { TextareaField } from "../../../components/form/TextareaField";

interface RuleField {
  fieldName: string;
  type: string;
  required?: boolean;
  unique?: boolean;
  enumValuesStr?: string;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
}

interface RuleConfigFormValues {
  id?: string;
  configCode: string;
  name: string;
  fields: RuleField[];
  rawJsonStr?: string;
}

export function RuleConfigPage() {
  const [data, setData] = useState<RuleConfig[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const methods = useForm<RuleConfigFormValues>({
    defaultValues: {
      configCode: "",
      name: "",
      fields: [
        { fieldName: "username", type: "string", required: true, minLength: 5, maxLength: 20, unique: true, pattern: "^[a-zA-Z0-9_]+$" },
        { fieldName: "role", type: "enum", enumValuesStr: "ADMIN, USER" }
      ],
      rawJsonStr: "{\n  \"username\": {\n    \"type\": \"string\",\n    \"required\": true,\n    \"minLength\": 5,\n    \"maxLength\": 20,\n    \"unique\": true,\n    \"pattern\": \"^[a-zA-Z0-9_]+$\"\n  },\n  \"role\": {\n    \"type\": \"enum\",\n    \"enumValues\": [\n      \"ADMIN\",\n      \"USER\"\n    ]\n  }\n}",
    },
  });

  const [activeTab, setActiveTab] = useState<string>("builder");

  const syncToJSON = (values: RuleConfigFormValues) => {
    let rulesObj: Record<string, any> = {};
    for (const field of values.fields) {
      if (!field.fieldName.trim()) continue;
      const ruleDetails: any = { type: field.type };
      if (field.required) ruleDetails.required = true;
      if (field.unique) ruleDetails.unique = true;
      if (field.type === "string") {
        if (field.minLength !== undefined && field.minLength !== null) ruleDetails.minLength = Number(field.minLength);
        if (field.maxLength !== undefined && field.maxLength !== null) ruleDetails.maxLength = Number(field.maxLength);
      } else if (field.type === "number") {
        if (field.min !== undefined && field.min !== null) ruleDetails.min = Number(field.min);
        if (field.max !== undefined && field.max !== null) ruleDetails.max = Number(field.max);
      } else if (field.type === "enum" && field.enumValuesStr) {
        const arr = field.enumValuesStr.split(",").map(s => s.trim()).filter(s => s.length > 0);
        if (arr.length > 0) ruleDetails.enumValues = arr;
      }
      if (field.pattern) {
        ruleDetails.pattern = field.pattern;
      }
      rulesObj[field.fieldName.trim()] = ruleDetails;
    }
    return JSON.stringify(rulesObj, null, 2);
  };

  const handleTabChange = (newTab: string) => {
    if (newTab === "json" && activeTab === "builder") {
      // Sync Builder -> JSON
      methods.setValue("rawJsonStr", syncToJSON(methods.getValues()));
    } else if (newTab === "builder" && activeTab === "json") {
      // Sync JSON -> Builder
      try {
        const rawJson = methods.getValues("rawJsonStr") || "{}";
        const rules = JSON.parse(rawJson);
        const parsedFields: RuleField[] = [];
        Object.keys(rules).forEach(key => {
          const rule = rules[key];
          parsedFields.push({
            fieldName: key,
            type: rule.type || "string",
            required: !!rule.required,
            unique: !!rule.unique,
            enumValuesStr: rule.enumValues ? rule.enumValues.join(", ") : "",
            minLength: rule.minLength,
            maxLength: rule.maxLength,
            min: rule.min,
            max: rule.max,
            pattern: rule.pattern,
          });
        });
        methods.setValue("fields", parsedFields.length > 0 ? parsedFields : [{ fieldName: "", type: "string", required: true }]);
      } catch (e) {
        toast.error("JSON không hợp lệ, vui lòng sửa lỗi cú pháp trước khi chuyển sang giao diện Builder!");
        return; // Dừng không cho chuyển tab
      }
    }
    setActiveTab(newTab);
  };

  const fetchConfigs = async () => {
    try {
      setLoading(true);
      const res = await ruleConfigApi.getAll();
      setData(res);
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi tải danh sách Rule Config");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchConfigs();
  }, []);

  const handleDelete = async (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa?")) {
      try {
        await ruleConfigApi.delete(id);
        toast.success("Xóa thành công");
        fetchConfigs();
      } catch {
        toast.error("Xóa thất bại");
      }
    }
  };

  const handleSave = async (values: RuleConfigFormValues) => {
    try {
      setIsSubmitting(true);
      
      let rulesObj: Record<string, any> = {};
      
      if (activeTab === "json") {
        try {
          const raw = values.rawJsonStr || "{}";
          rulesObj = JSON.parse(raw);
        } catch (e) {
          toast.error("JSON không hợp lệ, không thể lưu!");
          setIsSubmitting(false);
          return;
        }
      } else {
        // Parse Form Array -> API Dictionary
        for (const field of values.fields) {
          if (!field.fieldName.trim()) continue; // Skip empty names
          
          const ruleDetails: any = {
            type: field.type,
          };
          
          if (field.required) ruleDetails.required = true;
          if (field.unique) ruleDetails.unique = true;
          
          if (field.type === "string") {
            if (field.minLength !== undefined && field.minLength !== null) ruleDetails.minLength = Number(field.minLength);
            if (field.maxLength !== undefined && field.maxLength !== null) ruleDetails.maxLength = Number(field.maxLength);
          } else if (field.type === "number") {
            if (field.min !== undefined && field.min !== null) ruleDetails.min = Number(field.min);
            if (field.max !== undefined && field.max !== null) ruleDetails.max = Number(field.max);
          } else if (field.type === "enum" && field.enumValuesStr) {
            const arr = field.enumValuesStr.split(",").map(s => s.trim()).filter(s => s.length > 0);
            if (arr.length > 0) ruleDetails.enumValues = arr;
          }
  
          if (field.pattern) {
            ruleDetails.pattern = field.pattern;
          }

          rulesObj[field.fieldName.trim()] = ruleDetails;
        }
      }

      const payload: RuleConfig = {
        configCode: values.configCode,
        name: values.name,
        rules: rulesObj,
      };

      if (values.id) {
        await ruleConfigApi.update(values.id, payload);
        toast.success("Cập nhật thành công");
      } else {
        await ruleConfigApi.create(payload);
        toast.success("Thêm mới thành công");
      }
      setIsModalOpen(false);
      fetchConfigs();
    } catch {
      toast.error("Lưu thất bại");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openModal = (record?: RuleConfig) => {
    if (record) {
      // Parse API Dictionary -> Form Array
      const parsedFields: RuleField[] = [];
      if (record.rules) {
        Object.keys(record.rules).forEach(key => {
          const rule = record.rules[key];
          parsedFields.push({
            fieldName: key,
            type: rule.type || "string",
            required: !!rule.required,
            unique: !!rule.unique,
            enumValuesStr: rule.enumValues ? rule.enumValues.join(", ") : "",
            minLength: rule.minLength,
            maxLength: rule.maxLength,
            min: rule.min,
            max: rule.max,
            pattern: rule.pattern,
          });
        });
      }
      
      methods.reset({
        id: record.id,
        configCode: record.configCode,
        name: record.name,
        fields: parsedFields.length > 0 ? parsedFields : [{ fieldName: "", type: "string", required: true }],
        rawJsonStr: record.rules ? JSON.stringify(record.rules, null, 2) : "{}",
      });
    } else {
      methods.reset({
        id: undefined,
        configCode: "",
        name: "",
        fields: [
          { fieldName: "username", type: "string", required: true, minLength: 5, maxLength: 20, unique: true, pattern: "^[a-zA-Z0-9_]+$" },
          { fieldName: "role", type: "enum", enumValuesStr: "ADMIN, USER" }
        ],
        rawJsonStr: "{\n  \"username\": {\n    \"type\": \"string\",\n    \"required\": true,\n    \"minLength\": 5,\n    \"maxLength\": 20,\n    \"unique\": true,\n    \"pattern\": \"^[a-zA-Z0-9_]+$\"\n  },\n  \"role\": {\n    \"type\": \"enum\",\n    \"enumValues\": [\n      \"ADMIN\",\n      \"USER\"\n    ]\n  }\n}",
      });
    }
    setIsModalOpen(true);
  };

  const columns: DataTableColumn<RuleConfig>[] = [
    {
      header: "Mã Config",
      value: "configCode",
      render: (row) => <Text variant="smallSemibold">{row.configCode}</Text>,
    },
    {
      header: "Tên Config",
      value: "name",
    },
    {
      header: "Ngày cập nhật",
      value: "updatedAt",
      render: (row) => (
        <span>
          {row.updatedAt ? new Date(row.updatedAt).toLocaleString() : ""}
        </span>
      ),
    },
    {
      header: "Thao tác",
      value: "id",
      align: "right",
      render: (row) => (
        <Flex gap={8} justify="flex-end">
          <IconButton
            variant="ghost"
            icon={<Edit size={16} />}
            onClick={() => openModal(row)}
            aria-label="Sửa"
          />
          <IconButton
            variant="ghost"
            icon={<Trash2 size={16} color="#ef4444" />}
            onClick={() => handleDelete(row.id!)}
            aria-label="Xóa"
          />
        </Flex>
      ),
    },
  ];

  return (
    <>
      <DataViewLayout
        title="Quản lý Rule Config (Validation Rules)"
        toolbar={
          <Flex gap={12}>
            <Button
              variant="ghost"
              leftIcon={<RefreshCw size={18} />}
              onClick={fetchConfigs}
              disabled={loading}
            >
              Làm mới
            </Button>
            <Button
              variant="primary"
              leftIcon={<Plus size={18} />}
              onClick={() => openModal()}
            >
              Thêm mới
            </Button>
          </Flex>
        }
        table={
          <DataTable
            columns={columns}
            data={data}
            loading={loading}
            rowKey="id"
          />
        }
      />

      <Modal
        title={methods.getValues("id") ? "Sửa Rule Config" : "Thêm Rule Config"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={methods.handleSubmit(handleSave)}
        isLoading={isSubmitting}
        maxWidth="800px"
      >
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(handleSave)}>
            <Flex direction="column" gap={16}>
            <InputField
              name="configCode"
              label="Mã Config (Code)"
              placeholder="VD: USER_REG_01"
              required
            />

            <InputField
              name="name"
              label="Tên Config"
              placeholder="VD: Đăng ký người dùng"
              required
            />

            <Tabs.Root value={activeTab} onChange={handleTabChange}>
              <Tabs.List>
                <Tabs.Trigger value="builder">Giao diện (UI Builder)</Tabs.Trigger>
                <Tabs.Trigger value="json">Chỉnh sửa JSON (Copy/Paste)</Tabs.Trigger>
              </Tabs.List>
              
              <Tabs.Panel value="builder">
                <div style={{ marginTop: 16 }}>
                  {/* Dynamic Rule Builder Component */}
                  <RuleBuilder />
                </div>
              </Tabs.Panel>
              
              <Tabs.Panel value="json">
                <div style={{ marginTop: 16 }}>
                  <TextareaField
                    name="rawJsonStr"
                    label="Nhập trực tiếp JSON"
                    placeholder={`{\n  "username": {\n    "type": "string",\n    "required": true,\n    "minLength": 5,\n    "maxLength": 20,\n    "unique": true,\n    "pattern": "^[a-zA-Z0-9_]+$"\n  },\n  "role": {\n    "type": "enum",\n    "enumValues": ["ADMIN", "USER"]\n  }\n}`}
                    rows={15}
                    helperText="Cấu trúc JSON hợp lệ. Thay đổi ở đây sẽ đồng bộ sang Giao diện Builder (nếu không có lỗi cú pháp)."
                  />
                </div>
              </Tabs.Panel>
            </Tabs.Root>
          </Flex>
          </form>
        </FormProvider>
      </Modal>
    </>
  );
}
