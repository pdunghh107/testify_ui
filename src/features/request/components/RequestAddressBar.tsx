import { Loader2, Send } from "lucide-react";
import styled from "styled-components";

import { Button } from "../../../components/common/button";
import { InputField } from "../../../components/form/InputField";
import { SelectField } from "../../../components/form/SelectField";
import { Flex } from "../../../components/layout/flex";
import { METHOD_OPTIONS } from "../constants/runnerConfig";

const AddressBarContainer = styled(Flex)`
  background: ${({ theme }) => theme.colors.backgroundCard};
  padding: 16px;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.colors.borderDefault};
`;

export function RequestAddressBar({ isLoading }: { isLoading: boolean }) {
  return (
    <AddressBarContainer align="flex-end" gap={12}>
      <div style={{ width: 150 }}>
        <SelectField name="method" label="Method" options={METHOD_OPTIONS} />
      </div>

      <div style={{ flex: 1 }}>
        <InputField
          name="url"
          label="Request URL"
          placeholder="https://api.example.com/v1/users"
        />
      </div>

      <Button
        type="submit"
        variant="primary"
        disabled={isLoading}
        leftIcon={
          isLoading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <Send size={18} />
          )
        }
        style={{ height: 40, marginBottom: 4 }} // Align with inputs which have 40px height + label space
      >
        Send
      </Button>
    </AddressBarContainer>
  );
}
