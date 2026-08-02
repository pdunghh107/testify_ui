import { useRef } from "react";

/**
 * Custom hook để bắt sự kiện click chính xác lên thẻ overlay/backdrop.
 * Giúp chống lại lỗi:
 * - Kéo chuột bôi đen từ trong kéo ra ngoài (drag outside).
 * - Bấm chuột từ ngoài kéo vào trong (drag inside).
 * 
 * Chỉ khi mousedown VÀ mouseup đều diễn ra trên CHÍNH thẻ overlay,
 * callback onClose mới được kích hoạt.
 */
export const useOverlayClick = (onClose: () => void) => {
  const isMouseDown = useRef(false);

  const onMouseDown = (e: React.MouseEvent) => {
    // Chỉ đánh dấu là true nếu người dùng ấn trực tiếp lên thẻ overlay, không phải thẻ con
    if (e.target === e.currentTarget) {
      isMouseDown.current = true;
    }
  };

  const onMouseUp = (e: React.MouseEvent) => {
    if (isMouseDown.current && e.target === e.currentTarget) {
      onClose();
    }
    // Reset lại trạng thái
    isMouseDown.current = false;
  };

  return { onMouseDown, onMouseUp };
};
