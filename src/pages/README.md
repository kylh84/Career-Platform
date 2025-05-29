# Pages Structure / Cấu trúc Pages

## Directory Structure / Cấu trúc thư mục

```
pages/
│
├── error-pages/               # Error pages / Trang lỗi
│   ├── components/           # Error page components / Components cho trang lỗi
│   ├── 404Error.tsx         # 404 page / Trang 404
│   ├── 500Error.tsx         # 500 page / Trang 500
│   └── ErrorBoundary.tsx    # Error boundary component
│
├── auth/                     # Authentication pages / Trang xác thực
│   ├── components/          # Auth components / Components xác thực
│   ├── LoginPage.tsx       # Login page / Trang đăng nhập
│   └── RegisterPage.tsx    # Register page / Trang đăng ký
│
├── career/                   # Career related pages / Trang về nghề nghiệp
│   ├── components/          # Career components / Components nghề nghiệp
│   └── CareerPage.tsx      # Main career page / Trang nghề nghiệp chính
│
└── Home.tsx                  # Home page / Trang chủ
```

## Organization Principles / Nguyên tắc tổ chức

### 1. Feature-based Structure / Phân cấp theo tính năng

- Each major feature has its own directory / Mỗi tính năng lớn có thư mục riêng
- Feature-specific components in feature's components directory / Components riêng được đặt trong thư mục components của tính năng
- Shared components at higher level / Components dùng chung đặt ở cấp cao hơn

### 2. Layout Management / Quản lý Layout

```typescript
// Example of a page using layout / Ví dụ về trang sử dụng layout
const CareerPage: React.FC = () => {
  return (
    <DashboardLayout>
      <CareerContent />
    </DashboardLayout>
  );
};
```

### 3. Component Structure / Cấu trúc Component

```typescript
const PageComponent: React.FC = () => {
  // 1. Hooks & State / Hooks và State
  const [data, setData] = useState<DataType>();

  // 2. API Calls / Gọi API
  const { data, isLoading, error } = useQuery('key', fetchData);

  // 3. Event Handlers / Xử lý sự kiện
  const handleAction = () => {
    // Handle events / Xử lý sự kiện
  };

  // 4. Render
  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;

  return (
    <Layout>
      <Content />
    </Layout>
  );
};
```

## Best Practices / Quy tắc thực hành tốt nhất

### 1. Performance / Hiệu suất

- Use React.memo for static components / Sử dụng React.memo cho components ít thay đổi
- Implement code splitting / Thực hiện phân chia code
- Optimize re-renders / Tối ưu việc render lại

### 2. Error Handling / Xử lý lỗi

```typescript
<ErrorBoundary fallback={<ErrorPage />}>
  <PageContent />
</ErrorBoundary>
```

### 3. Loading States / Trạng thái tải

- Implement skeleton loading / Sử dụng skeleton loading
- Show appropriate loading indicators / Hiển thị chỉ báo tải phù hợp
- Handle loading states gracefully / Xử lý trạng thái tải một cách mượt mà

### 4. SEO & Metadata

```typescript
import { Helmet } from 'react-helmet-async';

const Page = () => (
  <>
    <Helmet>
      <title>Page Title</title>
      <meta name="description" content="Description" />
    </Helmet>
    <Content />
  </>
);
```

### 5. Responsive Design / Thiết kế responsive

- Mobile-first approach / Tiếp cận mobile-first
- Use consistent breakpoints / Sử dụng breakpoints nhất quán
- Implement fluid layouts / Thực hiện layout linh hoạt

## Testing / Kiểm thử

### Unit Tests / Kiểm thử đơn vị

```typescript
describe('Component', () => {
  it('renders correctly', () => {
    render(<Component />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
```

### Integration Tests / Kiểm thử tích hợp

- Test user flows / Kiểm tra luồng người dùng
- Test component integration / Kiểm tra tích hợp component
- Test API integration / Kiểm tra tích hợp API

### E2E Tests / Kiểm thử đầu cuối

- Test critical paths / Kiểm tra các luồng quan trọng
- Cross-browser testing / Kiểm tra đa trình duyệt
- Performance testing / Kiểm tra hiệu suất
