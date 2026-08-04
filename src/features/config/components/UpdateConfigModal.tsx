import { useForm, FormProvider } from "react-hook-form";
import { Modal } from "../../../components/overlay/modal/Modal";
import { ConfigForm, type ConfigFormValues } from "./ConfigForm";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { configApi } from "../api/configApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  initialData: ConfigFormValues | null;
}

export function UpdateConfigModal({ isOpen, onClose, onSuccess, initialData }: Props) {
  const [loading, setLoading] = useState(false);
  const methods = useForm<ConfigFormValues>({
    defaultValues: {
      name: "",
      baseUrl: "",
      config: "",
    },
  });

  useEffect(() => {
    if (initialData && isOpen) {
      methods.reset(initialData);
    }
  }, [initialData, isOpen, methods]);

  const onSubmit = async (data: ConfigFormValues) => {
    if (!initialData?.id) return;
    
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

      await configApi.update(initialData.id, {
        name: data.name,
        baseUrl: data.baseUrl,
        config: parsedConfig,
      });

      toast.success("Cập nhật cấu hình thành công!");
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi cập nhật cấu hình");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chỉnh sửa cấu hình"
      submitText={loading ? "Đang lưu..." : "Lưu thay đổi"}
      onConfirm={methods.handleSubmit(onSubmit)}
      >
      <FormProvider {...methods}>
        <ConfigForm />
      </FormProvider>
    </Modal>
  );
}
