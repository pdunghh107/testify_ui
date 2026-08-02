import { Flex } from "../../../components/layout/flex";
import { InputField } from "../../../components/form/InputField";
import { TextareaField } from "../../../components/form/TextareaField";

export interface ConfigFormValues {
  id?: string;
  name: string;
  baseUrl: string;
  config: string;
}

export function ConfigForm({ isReadOnly = false }: { isReadOnly?: boolean }) {
  return (
    <Flex direction="column" gap={16}>
      <InputField 
        name="name" 
        label="Tên cấu hình" 
        placeholder="VD: Cấu hình Production" 
        required
        disabled={isReadOnly}
      />
      
      <InputField 
        name="baseUrl" 
        label="URL Mặc định (Base URL)" 
        placeholder="VD: https://api.example.com" 
        required
        disabled={isReadOnly}
      />
      
      <TextareaField 
        name="config" 
        label="JSON Config" 
        placeholder='VD: { "headers": { "Authorization": "Bearer token..." } }' 
        disabled={isReadOnly}
        style={{ minHeight: 120, fontFamily: 'monospace' }}
      />
    </Flex>
  );
}
