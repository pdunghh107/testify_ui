import { useRef } from "react";
import { z } from "zod";

import { Form, type FormInstance } from "@/components/form/Form";
import { InputField } from "@/components/form/InputField";
import { TextareaField } from "@/components/form/TextareaField";
import { Modal } from "@/components/overlay/modal/Modal";

import { useCreateWorkspace } from "../../api/useWorkspaceQueries";

const schema = z.object({
  name: z
    .string()
    .min(1, "Vui lòng nhập tên workspace")
    .max(50, "Tối đa 50 ký tự"),
  description: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

export const CreateWorkspaceModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const formRef = useRef<FormInstance>(null);
  const createWorkspace = useCreateWorkspace();

  const handleSubmit = (data: FormValues) => {
    createWorkspace.mutate(data, {
      onSuccess: () => {
        formRef.current?.resetForm();
        onClose();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create New Workspace"
      isLoading={createWorkspace.isPending}
      onConfirm={() => formRef.current?.submit()}
      asForm={false}
    >
      <Form schema={schema} onSubmit={handleSubmit} ref={formRef}>
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <InputField
            name="name"
            label="Workspace Name"
            required
            placeholder="e.g. E-Commerce API"
          />
          <TextareaField
            name="description"
            label="Description"
            placeholder="Optional description..."
          />
        </div>
      </Form>
    </Modal>
  );
};
