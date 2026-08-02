import { Plus, Trash2 } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";

import { IconButton } from "../../../components/common/button";
import { InputField } from "../../../components/form/InputField";
import { Flex } from "../../../components/layout/flex";

export function KeyValueTable({ name }: { name: "params" | "headers" }) {
  const { control, register } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name,
  });

  return (
    <div>
      {fields.map((item, index) => (
        <Flex align="center" key={item.id} gap={8} style={{ marginBottom: 8 }}>
          <Flex justify="center" align="center" style={{ width: 30 }}>
            <input
              type="checkbox"
              {...register(`${name}.${index}.enabled`)}
              style={{ width: 16, height: 16, cursor: "pointer" }}
            />
          </Flex>
          <div style={{ flex: 1 }}>
            <InputField
              name={`${name}.${index}.key`}
              placeholder="Key"
              containerClassName="margin-0"
            />
          </div>
          <div style={{ flex: 1 }}>
            <InputField
              name={`${name}.${index}.value`}
              placeholder="Value"
              containerClassName="margin-0"
            />
          </div>
          <IconButton
            variant="ghost"
            icon={<Trash2 size={16} />}
            onClick={() => remove(index)}
            aria-label="Remove row"
          />
        </Flex>
      ))}
      <Flex justify="flex-start" style={{ marginTop: 8 }}>
        <button
          type="button"
          onClick={() => append({ key: "", value: "", enabled: true })}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            background: "none",
            border: "none",
            color: "#6366f1",
            cursor: "pointer",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          <Plus size={16} /> Thêm {name === "params" ? "Tham số" : "Header"}
        </button>
      </Flex>
    </div>
  );
}
