export const PASSWORD_REGEX =
  /^(?=\S+$)(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]).{8,100}$/;

export const PASSWORD_ERROR_MESSAGE =
  "Mật khẩu dài từ 8-100 ký tự, bao gồm chữ in hoa, in thường, số và ký tự đặc biệt.";
