import styled from "styled-components";

const StyledAsterisk = styled.span`
  margin-left: 4px;
  color: ${({ theme }) => theme.colors.danger};
`;

/**
 * Component RequiredAsterisk hiển thị dấu sao màu đỏ báo hiệu trường bắt buộc.
 * Thường được dùng bên trong Label của các input form.
 *
 * @example
 * ```tsx
 * <label>Họ và tên <RequiredAsterisk /></label>
 * ```
 */
export function RequiredAsterisk() {
  return <StyledAsterisk>*</StyledAsterisk>;
}
