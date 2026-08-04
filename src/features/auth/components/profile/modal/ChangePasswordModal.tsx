import { KeyRound } from "lucide-react";
import { useRef } from "react";

import { Form, type FormInstance } from "@/components/form/Form";
import { PasswordInput } from "@/components/form/PasswordInput";
import { Flex } from "@/components/layout/flex/Flex";
import { Modal } from "@/components/overlay/modal/Modal";
import { useChangePassword } from "@/features/auth/api/useChangePassword";
import {
  type ChangePasswordInput,
  changePasswordSchema,
} from "@/features/auth/validations/change-password-schema";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const formRef = useRef<FormInstance>(null);
  const changePasswordApi = useChangePassword();

  const handleSubmit = (data: ChangePasswordInput) => {
    changePasswordApi.mutate(data, {
      onSuccess: () => {
        onClose();
        formRef.current?.resetForm();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Đổi mật khẩu"
      icon={<KeyRound size={20} />}
      onConfirm={() => formRef.current?.submit()}
      isLoading={changePasswordApi.isPending}
    >
      <Form<ChangePasswordInput>
        ref={formRef}
        schema={changePasswordSchema}
        onSubmit={handleSubmit}
      >
        <Flex direction="column" gap={16}>
          <PasswordInput
            name="oldPassword"
            label="Mật khẩu hiện tại"
            placeholder="Nhập mật khẩu hiện tại"
            required
          />
          <PasswordInput
            name="newPassword"
            label="Mật khẩu mới"
            placeholder="Nhập mật khẩu mới"
            required
          />
          <PasswordInput
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            placeholder="Nhập lại mật khẩu mới"
            required
          />
        </Flex>
      </Form>
    </Modal>
  );
}
