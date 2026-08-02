import { useState } from "react";
import styled from "styled-components";
import { InputField, type RHFInputProps } from "./InputField";
import { Eye, EyeOff } from "lucide-react";

export type PasswordInputProps = Omit<RHFInputProps, "type" | "rightIcon" | "rightIconClickable">;

const ToggleButton = styled.button`
  background: none;
  border: none;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
  cursor: pointer;

  &:focus {
    outline: none;
    /* Có thể thêm hiệu ứng focus sau này */
  }
`;

export function PasswordInput(props: PasswordInputProps) {
  const [show, setShow] = useState(false);

  return (
    <InputField
      {...props}
      type={show ? "text" : "password"}
      rightIconClickable={true}
      rightIcon={
        <ToggleButton
          type="button" // Bắt buộc type="button" để không submit form
          onClick={() => setShow((prev) => !prev)}
          tabIndex={-1} // Ngăn người dùng vô tình bấm tab lọt vào icon con mắt
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </ToggleButton>
      }
    />
  );
}
