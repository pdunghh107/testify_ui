# Testify UI (Frontend)

Testify UI là hệ thống giao diện người dùng (Frontend) cho ứng dụng Testify (Nền tảng quản lý và chạy test API tương tự Postman). Dự án được thiết kế chuẩn Enterprise, tuân thủ nguyên tắc SOLID và DRY, với kiến trúc thư mục rõ ràng theo Feature-based.

## 🏗️ Cấu trúc dự án

Dự án được chia thành các thư mục cốt lõi nhằm dễ dàng bảo trì và mở rộng:

### 1. `src/components` (Thư viện UI dùng chung)
Đây là trái tim của giao diện, chứa các Component chuẩn mực được tái sử dụng xuyên suốt ứng dụng.
- **Tính năng chính:**
  - `common`: Các UI nhỏ (Button, Text, Badge, Avatar, Alert).
  - `form`: Các Component chuyên dụng cho biểu mẫu (Form, InputField, PasswordInput).
  - `overlay`: Các Component nổi trên giao diện (Modal sử dụng FocusTrap và ScrollLock an toàn, Dropdown).
  - `layout`: Hệ thống Layout chuẩn (Flex, PageLayout, DataViewLayout).
- **Nguyên tắc:** Xây dựng theo phong cách thư viện độc lập, có thể mang sang các dự án khác sử dụng lại mà không cần sửa đổi nhiều.

### 2. `src/features` (Chức năng nghiệp vụ)
Nơi chứa toàn bộ logic, giao diện và kết nối API của từng tính năng. Thay vì gom toàn bộ Component vào 1 nơi, Testify nhóm theo Feature.
- `auth`: Đăng nhập, đăng ký, quản lý Profile, Đổi mật khẩu.
- `workspace`: Quản lý không gian làm việc.
- `request`: Quản lý và thực thi API Request.
- `config`: Quản lý Rule Configs và Field Configs.

### 3. `src/api` & `src/store`
- `api`: Chứa cấu hình Axios Client, Interceptors, và định nghĩa kiểu dữ liệu (Types) dùng chung (như `ApiResponse`, `PaginatedResponse`).
- `store`: Quản lý Global State sử dụng `Zustand`. Chứa logic liên quan đến `useAuthStore` (lưu trữ phiên người dùng và phân quyền RBAC).

---

## 🛠️ Công nghệ sử dụng

- **Core:** React, TypeScript.
- **Build Tool:** Vite (Tối ưu hiệu suất và tốc độ dev).
- **Styling:** Styled-components.
- **State Management:** Zustand.
- **Data Fetching:** TanStack React Query (Tối ưu bộ nhớ đệm và đồng bộ dữ liệu server).
- **Routing:** TanStack Router.
- **Form & Validation:** React Hook Form, Zod.
- **Icon:** Lucide React.
- **Khác:** Axios, React Hot Toast, Focus-trap-react, React-remove-scroll.

### 🔮 Công nghệ đề xuất khi mở rộng dự án
1. **Testing:** Tích hợp `Vitest` và `React Testing Library` để đảm bảo UI không bị vỡ khi Refactor. `Playwright` cho End-to-End Testing.
2. **Storybook:** Hệ thống hóa và Document lại toàn bộ các Component trong `src/components`.
3. **i18n:** Tích hợp `react-i18next` để hỗ trợ đa ngôn ngữ (Tiếng Anh, Tiếng Việt).
4. **Performance:** Sử dụng Code Splitting mạnh mẽ hơn qua TanStack Router và Lazy Loading đối với các tính năng ít dùng.

---

## 📜 Tiêu chuẩn Lập trình (Coding Convention)

1. **SOLID & DRY:** Mọi Component mới phải được suy nghĩ kỹ về khả năng tái sử dụng, tránh lặp lại logic. 
2. **Alias Import:** Bắt buộc sử dụng `@/` thay cho các đường dẫn tương đối (như `../../`).
3. **Type-Safety:** Tránh dùng `any`. Các lỗi từ Axios phải được định nghĩa chuẩn thành `AxiosError<ApiResponse<T>>`.
4. **UI/UX:** Focus Trap và Scroll Lock là bắt buộc đối với các Component Overlay (Modal/Dialog) nhằm đảm bảo tiêu chuẩn A11y.

---

## 📚 Learner (Tài liệu học tập)

Dự án có đi kèm một thư mục `learner/` chứa các tài liệu phân tích kỹ thuật và giải thích chuyên sâu về cách các thành phần trong Frontend giao tiếp với Backend.

Xem chi tiết danh sách tài liệu tại: **[Thư mục Learner](file:///d:/dung/testify/testify_ui/learner/README.md)**.
