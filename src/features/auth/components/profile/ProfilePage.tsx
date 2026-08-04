import { useState } from "react";

import { Avatar } from "@/components/common/avatar";
import { Button } from "@/components/common/button/Button";
import { colors } from "@/styles/colors";
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
import {
  DANGER_ZONE_ACTIONS,
  type ProfileActionId,
  SECURITY_ACTIONS,
} from "@/features/auth/constants/profileConfig";

import { List, ListItem } from "@/components/common/list/List";
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

  const actionHandlers: Record<ProfileActionId, () => void> = {
    CHANGE_PASSWORD: () => setPasswordModalOpen(true),
    DEACTIVATE_ACCOUNT: () => setDeactivateModalOpen(true),
  };

  return (
    <PageLayout
      title="Hồ sơ cá nhân"
      subtitle="Quản lý thông tin tài khoản và bảo mật"
      content={
        <Flex direction="column" gap={40}>
          {/* Section: Thông tin cá nhân */}
          <section>
            <Text
              as="h2"
              variant="largeSemibold"
              style={{ marginBottom: 24, display: "block" }}
            >
              Thông tin chung
            </Text>

            <Flex gap={32} align="flex-start">
              <Flex direction="column" align="center" gap={12}>
                <Avatar
                  name={user?.fullName || "Người dùng"}
                  src={user?.avatarUrl}
                  size={100}
                  fontSize={32}
                />
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

          <Flex direction="column" gap={16}>
            <Text as="h2" variant="baseSemibold">
              Bảo mật tài khoản
            </Text>

            <List>
              {SECURITY_ACTIONS.map((action) => (
                <ListItem
                  key={action.id}
                  title={action.title}
                  description={action.description}
                  buttonText={action.buttonText}
                  buttonVariant={action.buttonVariant}
                  isDanger={action.isDanger}
                  onClick={actionHandlers[action.id]}
                />
              ))}
            </List>

            <Text
              as="h3"
              variant="baseSemibold"
              style={{
                color: colors.danger,
              }}
            >
              Vùng nguy hiểm
            </Text>

            <List variant="danger">
              {DANGER_ZONE_ACTIONS.map((action) => (
                <ListItem
                  key={action.id}
                  title={action.title}
                  description={action.description}
                  buttonText={action.buttonText}
                  buttonVariant={action.buttonVariant}
                  isDanger={action.isDanger}
                  onClick={actionHandlers[action.id]}
                />
              ))}
            </List>
          </Flex>

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
