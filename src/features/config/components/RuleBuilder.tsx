import { useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import { Flex } from "../../../components/layout/flex";
import { Text } from "../../../components/common/text";
import { Button, IconButton } from "../../../components/common/button";
import { InputField } from "../../../components/form/InputField";
import { SelectField } from "../../../components/form/SelectField";
import { SwitchField } from "../../../components/form/switch/SwitchField";
import { Plus, Trash2 } from "lucide-react";
import styled from "styled-components";
import { colors } from "../../../styles/colors";

const RuleRow = styled(Flex)`
  padding: 16px;
  border: 1px solid ${colors.borderDefault};
  border-radius: 8px;
  background: ${colors.backgroundApp};
  margin-bottom: 12px;
`;

export function RuleBuilder() {
  const { control, watch, setValue } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "fields",
  });

  // Watch all fields to re-render dependent constraint inputs
  const watchFields = watch("fields");

  // Tự động parse Min/Max từ Regex Pattern
  useEffect(() => {
    if (!watchFields) return;

    watchFields.forEach((field: any, index: number) => {
      const pattern = field.pattern;
      if (pattern && typeof pattern === "string") {
        // Tìm cấu trúc dạng {min,max} hoặc {min,} hoặc {min}
        const match = pattern.match(/\{(\d+)(?:,(\d*))?\}/);
        if (match) {
          const parsedMin = match[1] ? parseInt(match[1]) : undefined;
          const parsedMax = match[2] ? parseInt(match[2]) : parsedMin; // Nếu chỉ có {5} thì max cũng là 5

          // Set cho trường hợp là string
          if (field.type === "string" || field.type === "regex") {
            if (parsedMin !== undefined && field.minLength !== parsedMin) {
              setValue(`fields.${index}.minLength`, parsedMin);
            }
            if (parsedMax !== undefined && field.maxLength !== parsedMax) {
              setValue(`fields.${index}.maxLength`, parsedMax);
            }
          }

          // Set cho trường hợp là number (mặc dù ít khi number dùng pattern nhưng cứ parse cho an toàn)
          if (field.type === "number") {
            if (parsedMin !== undefined && field.min !== parsedMin) {
              setValue(`fields.${index}.min`, parsedMin);
            }
            if (parsedMax !== undefined && field.max !== parsedMax) {
              setValue(`fields.${index}.max`, parsedMax);
            }
          }
        }
      }
    });
  }, [watchFields, setValue]);

  return (
    <Flex direction="column" gap={8}>
      <Text variant="baseSemibold">Danh sách luật dữ liệu (Fields)</Text>

      {fields.map((field, index) => {
        const fieldType = watchFields?.[index]?.type || "string";

        return (
          <RuleRow key={field.id} direction="column" gap={16}>
            <Flex gap={12} align="flex-start">
              <div style={{ flex: 1 }}>
                <InputField
                  name={`fields.${index}.fieldName`}
                  label="Tên Field (Ví dụ: username)"
                  placeholder="Nhập tên field..."
                  required
                />
              </div>
              <div style={{ flex: 1 }}>
                <SelectField
                  name={`fields.${index}.type`}
                  label="Kiểu dữ liệu"
                  options={[
                    { label: "String", value: "string" },
                    { label: "Number", value: "number" },
                    { label: "Boolean", value: "boolean" },
                    { label: "Email", value: "email" },
                    { label: "UUID", value: "uuid" },
                    { label: "Enum (Danh sách)", value: "enum" },
                    { label: "Tùy chỉnh (Regex)", value: "regex" },
                  ]}
                  required
                />
              </div>
              <div style={{ paddingTop: 28 }}>
                <SwitchField
                  name={`fields.${index}.required`}
                  label="Bắt buộc (Required)?"
                />
              </div>
              <div style={{ paddingTop: 28 }}>
                <SwitchField
                  name={`fields.${index}.unique`}
                  label="Duy nhất (Unique)?"
                />
              </div>
              <div style={{ paddingTop: 24 }}>
                <IconButton
                  variant="ghost"
                  icon={<Trash2 size={20} color={colors.danger} />}
                  onClick={() => remove(index)}
                  aria-label="Xóa field"
                />
              </div>
            </Flex>

            {/* Các ràng buộc phụ thuộc vào Type */}
            <Flex
              gap={12}
              align="flex-start"
              style={{
                paddingLeft: 16,
                borderLeft: `2px solid ${colors.borderDefault}`,
              }}
            >
              {fieldType === "string" && (
                <>
                  <div style={{ flex: 1 }}>
                    <InputField
                      name={`fields.${index}.minLength`}
                      label="Min Length"
                      placeholder="Độ dài tối thiểu..."
                      type="number"
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <InputField
                      name={`fields.${index}.maxLength`}
                      label="Max Length"
                      placeholder="Độ dài tối đa..."
                      type="number"
                    />
                  </div>
                </>
              )}

              {fieldType === "number" && (
                <>
                  <div style={{ flex: 1 }}>
                    <InputField
                      name={`fields.${index}.min`}
                      label="Min Value"
                      placeholder="Giá trị nhỏ nhất..."
                      type="number"
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <InputField
                      name={`fields.${index}.max`}
                      label="Max Value"
                      placeholder="Giá trị lớn nhất..."
                      type="number"
                    />
                  </div>
                </>
              )}

              {fieldType === "enum" && (
                <div style={{ flex: 1 }}>
                  <InputField
                    name={`fields.${index}.enumValuesStr`}
                    label="Danh sách giá trị hợp lệ"
                    placeholder="VD: ADMIN, USER, GUEST"
                    helperText="Các giá trị cách nhau bằng dấu phẩy (,)"
                  />
                </div>
              )}

              {(fieldType === "regex" || fieldType === "string") && (
                <div style={{ flex: 1 }}>
                  <InputField
                    name={`fields.${index}.pattern`}
                    label="Regex Pattern"
                    placeholder="VD: ^[a-z]{5,10}$"
                    helperText="Tự động bóc tách độ dài {min,max}"
                  />
                </div>
              )}
            </Flex>
          </RuleRow>
        );
      })}

      {fields.length === 0 && (
        <Text variant="smallRegular" color="textMuted">
          Chưa có trường dữ liệu nào. Hãy thêm mới!
        </Text>
      )}

      <div>
        <Button
          type="button"
          variant="outline"
          leftIcon={<Plus size={16} />}
          onClick={() =>
            append({ fieldName: "", type: "string", required: true })
          }
        >
          Thêm trường dữ liệu (Add Field)
        </Button>
      </div>
    </Flex>
  );
}
