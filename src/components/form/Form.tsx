import { zodResolver } from "@hookform/resolvers/zod";
import { type ComponentProps, forwardRef, useImperativeHandle } from "react";
import {
  type FieldValues,
  FormProvider,
  useForm,
  type UseFormReturn,
} from "react-hook-form";
import type { ZodType } from "zod";

/**
 * Định nghĩa API được expose ra ngoài (thông qua ref) để component cha có thể gọi trực tiếp.
 */
export interface FormInstance {
  submit: () => void;
  resetForm: () => void;
  isDirty: boolean;
}

/**
 * Cấu hình Props cho component Form.
 * Kế thừa các thuộc tính chuẩn của thẻ form HTML, loại bỏ `onSubmit`, `children`, `ref` để ghi đè type chặt chẽ hơn.
 */
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

/**
 * Component Form tổng bao bọc logic của react-hook-form và zod (validation).
 * Tự động cung cấp FormProvider cho các trường (InputField, SelectField...) bên trong nó.
 * Hỗ trợ truyền ref để gọi hàm từ bên ngoài (như submit, reset).
 *
 * @example
 * ```tsx
 * const schema = z.object({ email: z.string().email() });
 * 
 * <Form schema={schema} onSubmit={(data) => console.log(data)}>
 *   <InputField name="email" label="Email" />
 *   <Button type="submit">Lưu</Button>
 * </Form>
 * ```
 */
export const Form = forwardRef(
  <TFieldValues extends FieldValues>(
    {
      schema,
      defaultData,
      onSubmit,
      children,
      ...props
    }: FormProps<TFieldValues>,
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
