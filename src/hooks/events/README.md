# Event Hooks

Các custom hooks giúp xử lý sự kiện và timing trong React.

## useEventListener

Hook để đăng ký event listener một cách an toàn với cleanup tự động.

### API

```typescript
function useEventListener<K extends keyof WindowEventMap>(
  eventName: K,
  handler: (event: WindowEventMap[K]) => void,
  element?: RefObject<Element> | null,
  options?: boolean | AddEventListenerOptions
): void;
```

### Tham số

- `eventName`: Tên của event
- `handler`: Hàm xử lý event
- `element`: Element để attach event (mặc định là window)
- `options`: Options cho addEventListener

### Ví dụ

```typescript
const KeyPressComponent = () => {
  const [key, setKey] = useState('');

  useEventListener('keydown', (e) => {
    setKey(e.key);
  });

  return <div>Last key pressed: {key}</div>;
};

// Với specific element
const ClickComponent = () => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEventListener(
    'click',
    () => {
      console.log('Button clicked!');
    },
    buttonRef
  );

  return <button ref={buttonRef}>Click me</button>;
};
```

## useTimeout

Hook để xử lý setTimeout với cleanup tự động và khả năng reset/clear.

### API

```typescript
function useTimeout(
  callback: () => void,
  delay: number | null
): {
  reset: () => void;
  clear: () => void;
};
```

### Tham số

- `callback`: Hàm cần thực thi sau delay
- `delay`: Thời gian delay (milliseconds), null để disable

### Ví dụ

```typescript
const NotificationComponent = () => {
  const [show, setShow] = useState(true);

  // Tự động ẩn notification sau 3 giây
  useTimeout(() => {
    setShow(false);
  }, 3000);

  return show ? <div>Notification!</div> : null;
};

// Với reset/clear
const TimerComponent = () => {
  const [count, setCount] = useState(0);
  const { reset, clear } = useTimeout(() => {
    setCount((c) => c + 1);
  }, 1000);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={reset}>Reset Timer</button>
      <button onClick={clear}>Stop Timer</button>
    </div>
  );
};
```

### Use Cases

1. Auto-dismiss notifications/alerts
2. Delayed actions
3. Polling/intervals với cleanup
4. Animation timing
5. Debouncing user actions
