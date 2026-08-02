import { InputField, type RHFInputProps } from "./InputField";
import { Search } from "lucide-react";

export type SearchInputProps = Omit<RHFInputProps, "leftIcon" | "type" | "leftIconClickable">;

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
