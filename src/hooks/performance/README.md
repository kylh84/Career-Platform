# Performance Hooks

Các custom hooks giúp tối ưu hiệu năng của ứng dụng.

## useDebounce

Hook để trì hoãn thực thi một hàm hoặc cập nhật giá trị, thường dùng cho các tác vụ như search, resize, scroll.

### API

```typescript
function useDebounce<T>(value: T, delay: number): T;
```

### Tham số

- `value`: Giá trị cần debounce
- `delay`: Thời gian trì hoãn (milliseconds)

### Ví dụ

```typescript
const SearchComponent = () => {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 300);

  useEffect(() => {
    // API call chỉ được thực hiện sau khi người dùng ngừng gõ 300ms
    searchAPI(debouncedSearch);
  }, [debouncedSearch]);

  return <input value={search} onChange={(e) => setSearch(e.target.value)} />;
};
```

## useThrottle

Hook để giới hạn tần suất thực thi một hàm, thường dùng cho các sự kiện xảy ra liên tục như scroll, resize.

### API

```typescript
function useThrottle<T>(value: T, interval: number): T;
```

### Tham số

- `value`: Giá trị cần throttle
- `interval`: Khoảng thời gian giữa các lần thực thi (milliseconds)

### Ví dụ

```typescript
const ScrollComponent = () => {
  const handleScroll = () => {
    console.log('Scroll position:', window.scrollY);
  };

  const throttledScroll = useThrottle(handleScroll, 100);

  useEffect(() => {
    window.addEventListener('scroll', throttledScroll);
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [throttledScroll]);

  return <div>Scroll me!</div>;
};
```

## useUpdateEffect

Hook tương tự như useEffect nhưng chỉ chạy khi dependencies thay đổi, bỏ qua lần mount đầu tiên.

### API

```typescript
function useUpdateEffect(effect: EffectCallback, deps?: DependencyList): void;
```

### Tham số

- `effect`: Hàm effect cần thực thi
- `deps`: Mảng dependencies

### Ví dụ

```typescript
const UpdateComponent = () => {
  const [count, setCount] = useState(0);

  useUpdateEffect(() => {
    // Chỉ chạy khi count thay đổi, không chạy lần đầu mount
    console.log('Count updated:', count);
  }, [count]);

  return <button onClick={() => setCount((c) => c + 1)}>Increment</button>;
};
```
