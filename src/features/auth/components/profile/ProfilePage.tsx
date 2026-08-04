import { KeyRound, ShieldAlert } from "lucide-react";
import { useState } from "react";

import { Alert } from "@/components/common/alert/Alert";
import { Avatar } from "@/components/common/avatar";
import { Badge } from "@/components/common/badge/Badge";
import { Button } from "@/components/common/button/Button";
import { Text } from "@/components/common/text/Text";
import { Form } from "@/components/form/Form";
import { InputField } from "@/components/form/InputField";
import { Flex } from "@/components/layout/flex/Flex";
import { PageLayout } from "@/components/layout/PageLayout";
import { useUpdateProfile } from "@/features/auth/api/useUpdateProfile";
import {
  type UpdateProfileInput,
  updateProfileSchema,
} from "@/features/auth/validations/update-profile-schema";
import { useAuthStore } from "@/store/authStore";

import { ChangePasswordModal } from "./modal/ChangePasswordModal";
import { DeactivateAccountModal } from "./modal/DeactivateAccountModal";

export function ProfilePage() {
  const { user } = useAuthStore();
  const updateProfileApi = useUpdateProfile();

  const [isPasswordModalOpen, setPasswordModalOpen] = useState(false);
  const [isDeactivateModalOpen, setDeactivateModalOpen] = useState(false);

  const handleSubmit = (data: UpdateProfileInput) => {
    updateProfileApi.mutate(data);
  };

  return (
    <PageLayout
      title="Hồ sơ cá nhân"
      subtitle="Quản lý thông tin tài khoản và bảo mật"
      content={
        <Flex direction="column" gap={32} style={{ maxWidth: 800 }}>
          {/* Section: Thông tin cá nhân */}
          <section>
            <Text variant="largeSemibold" style={{ marginBottom: 16 }}>
              Thông tin chung
            </Text>

            <Flex gap={24} align="flex-start">
              <Flex direction="column" align="center" gap={12}>
                <Avatar
                  name={user?.fullName || "Người dùng"}
                  src={user?.avatarUrl}
                  size={100}
                  fontSize={32}
                />
                <Flex gap={8}>
                  {user?.role && (
                    <Badge variant="primary">
                      {user.role === "super_admin"
                        ? "Quản trị viên cấp cao"
                        : user.role === "admin"
                          ? "Quản trị viên"
                          : "Người dùng"}
                    </Badge>
                  )}
                  {user?.active ? (
                    <Badge variant="success">Hoạt động</Badge>
                  ) : (
                    <Badge variant="error">Đã khóa</Badge>
                  )}
                </Flex>
                {user?.id && (
                  <Text variant="smallRegular" color="textMuted">
                    ID: {user.id.split("-")[0]}...
                  </Text>
                )}
              </Flex>

              <Form<UpdateProfileInput>
                schema={updateProfileSchema}
                defaultData={{
                  fullName: user?.fullName || "",
                  email: user?.email || "",
                  phone: user?.phone || "",
                }}
                onSubmit={handleSubmit}
                style={{ flex: 1 }}
              >
                {({ formState }) => (
                  <Flex direction="column" gap={16}>
                    <InputField
                      name="fullName"
                      label="Họ và tên"
                      placeholder="Nhập họ và tên"
                      required
                    />
                    <InputField
                      name="email"
                      label="Email"
                      placeholder="Nhập địa chỉ email"
                      disabled
                    />
                    <InputField
                      name="phone"
                      label="Số điện thoại"
                      placeholder="Nhập số điện thoại"
                    />
                    <div>
                      <Button
                        type="submit"
                        variant="primary"
                        disabled={
                          !formState.isDirty || updateProfileApi.isPending
                        }
                        isLoading={updateProfileApi.isPending}
                      >
                        Lưu thay đổi
                      </Button>
                    </div>
                  </Flex>
                )}
              </Form>
            </Flex>
          </section>

          {/* Section: Bảo mật */}
          <section>
            <Text variant="largeSemibold" style={{ marginBottom: 16 }}>
              Bảo mật tài khoản
            </Text>
            <Flex direction="column" gap={16}>
              <Flex
                align="center"
                justify="space-between"
                style={{
                  padding: 16,
                  border: "1px solid var(--border-light)",
                  borderRadius: 8,
                }}
              >
                <Flex align="center" gap={16}>
                  <div
                    style={{
                      padding: 8,
                      background: "var(--bg-muted)",
                      borderRadius: 8,
                    }}
                  >
                    <KeyRound size={20} />
                  </div>
                  <div>
                    <Text variant="baseMedium">Đổi mật khẩu</Text>
                    <Text variant="smallRegular" color="textMuted">
                      Cập nhật mật khẩu để bảo vệ tài khoản của bạn
                    </Text>
                  </div>
                </Flex>
                <Button
                  variant="outline"
                  onClick={() => setPasswordModalOpen(true)}
                >
                  Đổi mật khẩu
                </Button>
              </Flex>

              <Alert
                variant="error"
                title="Vùng nguy hiểm (Vô hiệu hóa tài khoản)"
                icon={ShieldAlert}
              >
                <Flex align="center" justify="space-between">
                  <Text variant="baseRegular">
                    Khi vô hiệu hóa tài khoản, bạn sẽ không thể đăng nhập lại
                    được. Hành động này không thể hoàn tác.
                  </Text>
                  <Button
                    variant="danger"
                    onClick={() => setDeactivateModalOpen(true)}
                  >
                    Vô hiệu hóa
                  </Button>
                </Flex>
              </Alert>
            </Flex>
          </section>

          {/* Modals */}
          <ChangePasswordModal
            isOpen={isPasswordModalOpen}
            onClose={() => setPasswordModalOpen(false)}
          />
          <DeactivateAccountModal
            isOpen={isDeactivateModalOpen}
            onClose={() => setDeactivateModalOpen(false)}
          />
        </Flex>
      }
    />
  );
}
