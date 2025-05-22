# Custom React Hooks

Bộ sưu tập các custom React hooks được tổ chức theo chức năng để tái sử dụng trong dự án.

## Cấu trúc thư mục

```
hooks/
├── performance/          # Hooks liên quan đến tối ưu hiệu năng
│   ├── useDebounce      # Trì hoãn thực thi hàm
│   ├── useThrottle      # Giới hạn tần suất thực thi
│   └── useUpdateEffect  # useEffect chỉ chạy khi dependencies thay đổi
├── storage/             # Hooks liên quan đến lưu trữ
│   ├── useLocalStorage  # Quản lý state với localStorage
│   └── usePrevious      # Lưu trữ giá trị trước đó của state
├── events/              # Hooks xử lý sự kiện
│   ├── useEventListener # Đăng ký event listener
│   └── useTimeout       # Xử lý setTimeout
└── ui/                  # Hooks liên quan đến UI
    └── toast/           # Hệ thống thông báo toast
```

## Cách sử dụng

### Performance Hooks

#### useDebounce

```typescript
import { useDebounce } from '@/hooks/performance';

// Trì hoãn cập nhật giá trị search trong 300ms
const debouncedSearch = useDebounce(searchTerm, 300);
```

#### useThrottle

```typescript
import { useThrottle } from '@/hooks/performance';

// Giới hạn scroll handler chỉ chạy mỗi 100ms
const throttledScroll = useThrottle(handleScroll, 100);
```

#### useUpdateEffect

```typescript
import { useUpdateEffect } from '@/hooks/performance';

// Chỉ chạy effect khi dependencies thay đổi, bỏ qua lần mount đầu tiên
useUpdateEffect(() => {
  // Effect code
}, [dependency]);
```

### Storage Hooks

#### useLocalStorage

```typescript
import { useLocalStorage } from '@/hooks/storage';

// Lưu trữ theme trong localStorage
const [theme, setTheme] = useLocalStorage('theme', 'light');
```

#### usePrevious

```typescript
import { usePrevious } from '@/hooks/storage';

// Lấy giá trị trước đó của count
const prevCount = usePrevious(count);
```

### Event Hooks

#### useEventListener

```typescript
import { useEventListener } from '@/hooks/events';

// Đăng ký global event listener
useEventListener('keydown', handleKeyDown);
```

#### useTimeout

```typescript
import { useTimeout } from '@/hooks/events';

// Thực thi callback sau 1 khoảng thời gian
useTimeout(() => {
  // Callback code
}, 1000);
```

### UI Hooks

#### useToast

```typescript
import { useToast } from '@/hooks/ui/toast';

const toast = useToast();

// Hiển thị thông báo
toast.success('Operation completed successfully');
```

## Testing

Mỗi hook đều có file test riêng trong cùng thư mục. Để chạy test:

```bash
npm test
```

## Đóng góp

Khi thêm hook mới:

1. Tạo hook trong thư mục category phù hợp
2. Thêm test cho hook
3. Export hook trong file index.ts của category
4. Cập nhật documentation trong README.md

## Quy ước đặt tên

- Tên hook bắt đầu bằng `use`
- Tên file giống với tên hook
- File test có đuôi `.test.ts`
