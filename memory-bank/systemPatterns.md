# System Patterns: Career Platform

## Kiến trúc tổng thể

- Ứng dụng web client-server, SPA (Single Page Application).
- Frontend: React (hoặc Next.js), giao tiếp API.
- Backend: RESTful API, tích hợp AI service (CV, code, roadmap, career).

## Design Patterns

- Component-based UI (React components).
- State management: Context API hoặc Redux cho dashboard, auth.
- Authentication: JWT hoặc session-based.
- Responsive design, tối ưu trải nghiệm trên desktop/mobile.

## Luồng chính

- Đăng ký/đăng nhập → Dashboard → Chọn tính năng → Nhận kết quả AI → Gợi ý cá nhân hóa.

## Quyết định kỹ thuật

- Ưu tiên bảo mật thông tin người dùng.
- Tối ưu tốc độ phản hồi và UX.
- Dễ mở rộng thêm tính năng AI mới.

## Dashboard Patterns

- Sidebar động, main content hiển thị page con tương ứng với mục được chọn.
- Mỗi page con là một React component riêng biệt, điều hướng qua state hoặc context.
- Đảm bảo separation of concerns, dễ mở rộng thêm tính năng mới.
- Các flow nghiệp vụ và UI mockup được tham khảo sát từ yêu cầu chi tiết.
