import { Search } from "lucide-react";

import { InputField, type RHFInputProps } from "./InputField";

/**
 * Cấu hình Props cho SearchInput.
 * Kế thừa từ InputField nhưng loại bỏ `leftIcon` vì mặc định đã có icon tìm kiếm.
 */
export type SearchInputProps = Omit<
  RHFInputProps,
  "leftIcon" | "type" | "leftIconClickable"
>;

/**
 * Component SearchInput chuyên dùng cho việc tìm kiếm.
 * Đã cấu hình sẵn icon kính lúp (Search) ở bên trái và placeholder mặc định.
 *
 * @example
 * ```tsx
 * // Dùng bên trong <Form>
 * <SearchInput name="searchQuery" placeholder="Tìm kiếm tài liệu..." />
 * ```
 */
export function SearchInput(props: SearchInputProps) {
  return (
    <InputField
      {...props}
      type="search"
      leftIconClickable={false}
      leftIcon={<Search size={18} />}
      // Thêm default placeholder nhưng vẫn cho phép ghi đè
      placeholder={props.placeholder || "Tìm kiếm..."}
    />
  );
}
