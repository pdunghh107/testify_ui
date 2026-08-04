import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import styled from "styled-components";

import { InputField, type RHFInputProps } from "./InputField";

/**
 * Cấu hình Props cho PasswordInput (Loại bỏ các props không phù hợp như type, rightIcon).
 */
export type PasswordInputProps = Omit<
  RHFInputProps,
  "type" | "rightIcon" | "rightIconClickable"
>;

const ToggleButton = styled.button`
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4px;
  border: none;

  color: inherit;

  background: none;

  &:focus {
    outline: none;

    /* Có thể thêm hiệu ứng focus sau này */
  }
`;

/**
 * Component PasswordInput kế thừa từ InputField nhưng được cấu hình sẵn cho việc nhập mật khẩu.
 * Tự động gắn icon con mắt ở bên phải để chuyển đổi ẩn/hiện mật khẩu (toggle visibility).
 *
 * @example
 * ```tsx
 * // Phải đặt bên trong <Form>
 * <PasswordInput 
 *   name="password" 
 *   label="Mật khẩu" 
 *   placeholder="Nhập mật khẩu của bạn" 
 *   required 
 * />
 * ```
 */
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
