import { useForm, FormProvider } from "react-hook-form";
import { Modal } from "../../../components/overlay/modal/Modal";
import { ConfigForm, type ConfigFormValues } from "./ConfigForm";
import { useEffect } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ConfigFormValues | null;
}

export function DetailConfigModal({ isOpen, onClose, data }: Props) {
  const methods = useForm<ConfigFormValues>({
    defaultValues: {
      name: "",
      baseUrl: "",
      config: "",
    },
  });

  useEffect(() => {
    if (data && isOpen) {
      methods.reset(data);
    }
  }, [data, isOpen, methods]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Chi tiết cấu hình"
      submitText="Đóng"
      onConfirm={onClose} // Just close on submit
      showX={true}
    >
      <FormProvider {...methods}>
        <ConfigForm isReadOnly={true} />
      </FormProvider>
    </Modal>
  );
}
