import { AlertTriangle } from "lucide-react";
import { useRef } from "react";

import { Text } from "@/components/common/text/Text";
import { Form, type FormInstance } from "@/components/form/Form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { Flex } from "@/components/layout/flex/Flex";
import { Modal } from "@/components/overlay/modal/Modal";
import { useDeactivate } from "@/features/auth/api/useDeactivate";
import {
  type DeactivateInput,
  deactivateSchema,
} from "@/features/auth/validations/deactivate-schema";

interface DeactivateAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function DeactivateAccountModal({
  isOpen,
  onClose,
}: DeactivateAccountModalProps) {
  const formRef = useRef<FormInstance>(null);
  const deactivateApi = useDeactivate();

  const handleSubmit = (data: DeactivateInput) => {
    deactivateApi.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Xác nhận vô hiệu hóa"
      icon={<AlertTriangle size={20} />}
      type="danger"
      submitText="Xác nhận"
      onConfirm={() => formRef.current?.submit()}
      isLoading={deactivateApi.isPending}
    >
      <Form<DeactivateInput>
        ref={formRef}
        schema={deactivateSchema}
        onSubmit={handleSubmit}
      >
        <Flex direction="column" gap={16}>
          <Text variant="baseRegular" color="textMuted">
            Hành động này sẽ vô hiệu hóa tài khoản của bạn. Vui lòng nhập mật
            khẩu để xác nhận.
          </Text>
          <PasswordInput
            name="password"
            label="Mật khẩu xác nhận"
            placeholder="Nhập mật khẩu của bạn"
            required
          />
        </Flex>
      </Form>
    </Modal>
  );
}
