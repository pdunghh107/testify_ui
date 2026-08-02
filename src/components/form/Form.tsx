import { forwardRef, useImperativeHandle, type ComponentProps } from "react";
import { useForm, FormProvider, type UseFormReturn, type FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ZodType } from "zod";

// Định nghĩa API gọi từ component cha
export interface FormInstance {
  submit: () => void;
  resetForm: () => void;
  isDirty: boolean;
}

// Mở rộng từ thẻ form chuẩn, Omit onSubmit, children, và ref gốc để ghi đè
interface FormProps<TFieldValues extends FieldValues> extends Omit<
  ComponentProps<"form">,
  "onSubmit" | "children" | "ref"
> {
  schema: ZodType<TFieldValues, any, any>;
  defaultData?: Partial<TFieldValues>;
  onSubmit: (data: TFieldValues) => void;
  // Cho phép children là node bình thường hoặc function nhận tham số methods
  children:
    | React.ReactNode
    | ((methods: UseFormReturn<TFieldValues>) => React.ReactNode);
}

// Trick ép kiểu để forwardRef không làm mất Generics Type của Typescript
export const Form = forwardRef(
  <TFieldValues extends FieldValues>(
    { schema, defaultData, onSubmit, children, ...props }: FormProps<TFieldValues>,
    ref: React.Ref<FormInstance>,
  ) => {
    const methods = useForm<TFieldValues>({
      resolver: zodResolver(schema),
      // Ở bản RHF mới, dùng 'values' thay vì 'defaultValues'
      // sẽ tự động sync data mà không cần dùng useEffect để reset
      values: defaultData as TFieldValues,
    });

    const {
      formState: { isDirty },
      handleSubmit,
      reset,
    } = methods;

    // Đẩy API ra ngoài cho ref sử dụng
    useImperativeHandle(ref, () => ({
      submit: handleSubmit(onSubmit),
      resetForm: () => reset(),
      isDirty: isDirty,
    }));

    return (
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} {...props}>
          {typeof children === "function" ? children(methods) : children}
        </form>
      </FormProvider>
    );
  },
) as <TFieldValues extends FieldValues>(
  props: FormProps<TFieldValues> & { ref?: React.Ref<FormInstance> },
) => React.ReactElement;
