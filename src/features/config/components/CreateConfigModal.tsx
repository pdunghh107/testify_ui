import { useForm, FormProvider } from "react-hook-form";
import { Modal } from "../../../components/overlay/modal/Modal";
import { ConfigForm, type ConfigFormValues } from "./ConfigForm";
import toast from "react-hot-toast";
import { configApi } from "../api/configApi";
import { useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function CreateConfigModal({ isOpen, onClose, onSuccess }: Props) {
  const [loading, setLoading] = useState(false);
  const methods = useForm<ConfigFormValues>({
    defaultValues: {
      name: "",
      baseUrl: "",
      config: "",
    },
  });

  const onSubmit = async (data: ConfigFormValues) => {
    try {
      setLoading(true);
      let parsedConfig = null;
      if (data.config && data.config.trim()) {
        try {
          parsedConfig = JSON.parse(data.config);
        } catch (e) {
          toast.error("JSON Config không hợp lệ!");
          return;
        }
      }

      await configApi.create({
        name: data.name,
        baseUrl: data.baseUrl,
        config: parsedConfig,
      });

      toast.success("Thêm cấu hình thành công!");
      onSuccess();
      methods.reset();
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi tạo cấu hình");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Thêm cấu hình mới"
      submitText={loading ? "Đang tạo..." : "Tạo mới"}
      onConfirm={methods.handleSubmit(onSubmit)}
      >
      <FormProvider {...methods}>
        <ConfigForm />
      </FormProvider>
    </Modal>
  );
}
