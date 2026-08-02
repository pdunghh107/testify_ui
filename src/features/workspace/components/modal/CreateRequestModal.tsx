import { useRef } from "react";
import { z } from "zod";

import { Form, type FormInstance } from "@/components/form/Form";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { Flex } from "@/components/layout/flex";
import { Modal } from "@/components/overlay/modal/Modal";
import { useCreateRequest } from "@/features/request/api/useRequestQueries";

const createRequestSchema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên Request"),
  url: z.string().min(1, "Vui lòng nhập URL").url("URL không hợp lệ"),
  method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"]),
});

type CreateRequestFormValues = z.infer<typeof createRequestSchema>;

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
  folderId?: string;
}

export function CreateRequestModal({
  isOpen,
  onClose,
  workspaceId,
  folderId,
}: CreateRequestModalProps) {
  const formRef = useRef<FormInstance>(null);
  const createRequest = useCreateRequest();

  const onSubmit = async (data: CreateRequestFormValues) => {
    await createRequest.mutateAsync({
      workspaceId,
      folderId,
      name: data.name,
      url: data.url,
      method: data.method,
      headers: {
        "Content-Type": "application/json",
      },
      bodyTemplate: "{}",
    });
    formRef.current?.resetForm();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Tạo mới Request"
      isLoading={createRequest.isPending}
      onSubmit={() => formRef.current?.submit()}
      asForm={false}
    >
      <Form
        schema={createRequestSchema}
        onSubmit={onSubmit}
        ref={formRef}
        defaultData={{
          name: "",
          url: "http://localhost:9002/api/test",
          method: "POST",
        }}
      >
        <Flex direction="column" gap={16}>
          <InputField
            name="name"
            label="Tên Request"
            placeholder="Ví dụ: Tạo mới User"
          />
          <InputField
            name="url"
            label="URL"
            placeholder="https://api.example.com/v1/users"
          />
          <SelectField
            name="method"
            label="Method"
            options={[
              { label: "GET", value: "GET" },
              { label: "POST", value: "POST" },
              { label: "PUT", value: "PUT" },
              { label: "DELETE", value: "DELETE" },
              { label: "PATCH", value: "PATCH" },
            ]}
          />
        </Flex>
      </Form>
    </Modal>
  );
}
