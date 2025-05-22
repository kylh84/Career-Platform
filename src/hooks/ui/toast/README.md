# Toast Hooks

Hệ thống hiển thị thông báo toast trong ứng dụng.

## Cài đặt

1. Wrap ứng dụng với `ToastProvider`:

```tsx
import { ToastProvider } from '@/hooks/ui/toast';

const App = () => {
  return <ToastProvider>{/* App content */}</ToastProvider>;
};
```

2. Sử dụng `useToast` hook trong components:

```tsx
import { useToast } from '@/hooks/ui/toast';

const MyComponent = () => {
  const toast = useToast();

  return <button onClick={() => toast.success('Operation successful!')}>Show Toast</button>;
};
```

## API

### useToast Hook

```typescript
function useToast(): {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  warning: (message: string, options?: ToastOptions) => void;
  dismiss: (id?: string) => void;
  dismissAll: () => void;
};
```

### ToastOptions

```typescript
interface ToastOptions {
  duration?: number; // Thời gian hiển thị (ms)
  position?: ToastPosition; // Vị trí hiển thị
  id?: string; // ID của toast
  onClose?: () => void; // Callback khi toast đóng
}

type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
```

## Ví dụ

### Basic Usage

```tsx
const Component = () => {
  const toast = useToast();

  const handleClick = () => {
    // Success toast
    toast.success('Operation completed!');

    // Error toast
    toast.error('Something went wrong!');

    // Info toast
    toast.info('New message received');

    // Warning toast
    toast.warning('Low disk space');
  };

  return <button onClick={handleClick}>Show Toast</button>;
};
```

### Custom Options

```tsx
const Component = () => {
  const toast = useToast();

  const showCustomToast = () => {
    toast.success('Custom toast!', {
      duration: 5000,
      position: 'top-center',
      onClose: () => console.log('Toast closed'),
    });
  };

  return <button onClick={showCustomToast}>Show Custom Toast</button>;
};
```

### Dismissing Toasts

```tsx
const Component = () => {
  const toast = useToast();

  const showDismissibleToast = () => {
    const id = 'my-toast';
    toast.info('Click to dismiss', { id });

    // Dismiss specific toast
    setTimeout(() => toast.dismiss(id), 2000);

    // Or dismiss all toasts
    // setTimeout(() => toast.dismissAll(), 2000);
  };

  return <button onClick={showDismissibleToast}>Show Dismissible Toast</button>;
};
```

## Styling

Toast messages sử dụng Tailwind CSS cho styling. Bạn có thể customize styles bằng cách override các classes trong theme configuration.
