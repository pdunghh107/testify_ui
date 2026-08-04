import { useRef } from "react";
import { z } from "zod";
import { Modal } from "@/components/overlay/modal/Modal";
import { Form, type FormInstance } from "@/components/form/Form";
import { InputField } from "@/components/form/InputField";
import { useCreateFolder } from "../../api/useWorkspaceQueries";

const schema = z.object({
  name: z.string().min(1, "Vui lòng nhập tên folder"),
});

type FormValues = z.infer<typeof schema>;

export const CreateFolderModal = ({
  isOpen,
  onClose,
  workspaceId,
  parentFolderId,
}: {
  isOpen: boolean;
  onClose: () => void;
  workspaceId: string;
  parentFolderId?: string | null;
}) => {
  const formRef = useRef<FormInstance>(null);
  const createFolder = useCreateFolder(workspaceId);

  const handleSubmit = (data: FormValues) => {
    createFolder.mutate(
      { name: data.name, parentFolderId },
      {
        onSuccess: () => {
          formRef.current?.resetForm();
          onClose();
        },
      },
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={parentFolderId ? "Create Sub-folder" : "Create Folder"}
      isLoading={createFolder.isPending}
      onConfirm={() => formRef.current?.submit()}
      asForm={false}
    >
      <Form schema={schema} onSubmit={handleSubmit} ref={formRef}>
        <InputField
          name="name"
          label="Folder Name"
          required
          placeholder="e.g. Auth API"
        />
      </Form>
    </Modal>
  );
};
