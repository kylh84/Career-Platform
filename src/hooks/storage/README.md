# Storage Hooks

Các custom hooks giúp quản lý và lưu trữ state.

## useLocalStorage

Hook để đồng bộ state với localStorage, tự động parse/stringify JSON.

### API

```typescript
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T | ((val: T) => T)) => void];
```

### Tham số

- `key`: Khóa lưu trữ trong localStorage
- `initialValue`: Giá trị khởi tạo

### Ví dụ

```typescript
const ThemeComponent = () => {
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  return <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Toggle theme: {theme}</button>;
};
```

## usePrevious

Hook để lưu trữ và truy cập giá trị trước đó của một state hoặc prop.

### API

```typescript
function usePrevious<T>(value: T): T | undefined;
```

### Tham số

- `value`: Giá trị cần lưu trữ

### Ví dụ

```typescript
const CounterComponent = () => {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>Current: {count}</p>
      <p>Previous: {prevCount}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
};
```

### Use Cases

1. So sánh giá trị hiện tại với giá trị trước đó
2. Animate khi giá trị thay đổi
3. Undo/Redo functionality
4. Theo dõi thay đổi của props/state
