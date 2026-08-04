# Hiểu về AxiosError và Cấu trúc JSON trong Axios

Khi làm việc với các API Backend trong React thông qua thư viện `axios`, việc bắt lỗi (Error Handling) và hiểu rõ cấu trúc của đối tượng Lỗi là một trong những kỹ năng quan trọng nhất để làm ra một ứng dụng Type-Safe (an toàn kiểu dữ liệu).

Tài liệu này sẽ giải thích chi tiết cơ chế hoạt động của `AxiosError` và lý do vì sao chúng ta lại lấy dữ liệu thông qua `error.response?.data?.message`.

---

## 1. Bản chất của HTTP Error

Khi Backend xử lý một Request và xảy ra lỗi (ví dụ: Sai mật khẩu, Không tìm thấy dữ liệu, Không có quyền truy cập), Backend thường sẽ làm 2 việc:

1. Đặt HTTP Status Code thành dải lỗi 4xx (Client Error) hoặc 5xx (Server Error). Ví dụ: `400 Bad Request`, `401 Unauthorized`.
2. Trả về một **Body (thường là định dạng JSON)** chứa thông tin chi tiết về lỗi đó.

**Ví dụ một JSON Body từ Backend:**

```json
{
  "success": false,
  "code": "PASSWORD_INCORRECT",
  "message": "Mật khẩu không chính xác",
  "data": null
}
```

---

## 2. Axios "Gói" Lỗi Lại Như Thế Nào?

Thư viện Axios được cấu hình mặc định để **ném ra một Exception (Throw Error)** đối với bất kỳ HTTP Status Code nào nằm ngoài dải `2xx`.

Điều đặc biệt là, Axios không vứt đi cái JSON Body của Backend. Nó tạo ra một đối tượng đặc biệt tên là `AxiosError` bọc toàn bộ thông tin về cuộc gọi API bị lỗi đó lại.

**Cấu trúc của đối tượng AxiosError:**

```javascript
{
  message: "Request failed with status code 400", // Đây là message của bản thân Axios
  name: "AxiosError",
  code: "ERR_BAD_REQUEST",
  config: { /* Các cấu hình của request như url, method, headers... */ },

  // Trọng tâm là object `response` này
  response: {
    status: 400,
    statusText: "Bad Request",
    headers: { ... },

    // Thuộc tính `data` chính là cái Body (JSON) mà Backend đã trả về!
    data: {
      success: false,
      code: "PASSWORD_INCORRECT",
      message: "Mật khẩu không chính xác",
      data: null
    }
  }
}
```

---

## 3. Vì sao lại là `error.response?.data?.message`?

Từ cấu trúc trên, để lấy được cái thông báo lỗi chuẩn xác từ Backend (để hiển thị cho người dùng qua Toast notification), chúng ta phải đi theo đường dẫn:

1. `error`: Chính là toàn bộ cái đối tượng AxiosError.
2. `response`: Lấy thông tin phản hồi từ Server.
3. `data`: Lấy phần Body (JSON) của phản hồi.
4. `message`: Lấy trường `message` bên trong cái JSON đó.

**Tại sao lại dùng toán tử Optional Chaining (`?.`)?**
Không phải lúc nào AxiosError cũng có `response`. Ví dụ, nếu Server bị sập hoàn toàn (Down), hoặc mất kết nối mạng (Network Error), Request sẽ không bao giờ đi tới Server và Server cũng không trả về một Response nào cả. Lúc này `error.response` sẽ bị `undefined`.
Sử dụng `error.response?.data?.message` giúp code không bị văng lỗi (Crash app) khi điều đó xảy ra.

---

## 4. Áp dụng TypeScript (Type-Safety)

Trong TypeScript, nếu ta để `(error: any) => {}` thì khi gõ `error.response.data.message`, IDE (VSCode/WebStorm) sẽ không gợi ý code (Intellisense) và không kiểm tra lỗi cú pháp cho bạn.

Do đó, chúng ta ép kiểu cho đối tượng lỗi:

```typescript
import type { AxiosError } from "axios";
import { type ApiResponse } from "@/api/types";

// ...
onError: (error: AxiosError<ApiResponse<void>>) => {
  toast.error(error.response?.data?.message || "Lỗi mạng");
};
```

Ở đây:

- `AxiosError<T>` là Generic Type của thư viện Axios, trong đó chữ `T` đại diện cho kiểu dữ liệu của `response.data`.
- `ApiResponse<void>` là Interface định nghĩa sẵn chuẩn JSON của Backend (gồm các field `success`, `code`, `message`, `data`).

Sự kết hợp này nói với TypeScript rằng: _"Này, cái lỗi này được bọc bởi Axios, và cái ruột (body/data) bên trong nó có cấu trúc của một `ApiResponse` đấy nhé"_.

Và nhờ vậy, bạn có một luồng bắt lỗi vừa an toàn (không bao giờ Crash), vừa chặt chẽ, dễ bảo trì!
