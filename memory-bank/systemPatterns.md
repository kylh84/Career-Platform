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

## System Architecture Improvements

### State Management

- Consider React Query implementation for server state
- Redux store structure optimization needed
- Add persistence layer for state management

### Performance Architecture

- Implement code splitting strategy
- Add lazy loading for routes
- Optimize bundle size
- Improve caching strategy

### Security Architecture

- Add security headers
- Implement CSRF protection
- Add rate limiting for API calls
- Enhanced authentication flow

### Testing Architecture

- Unit testing framework for components
- Integration testing setup for main flows
- E2E testing infrastructure
- Test coverage monitoring

### Error Handling Architecture

- Global error boundary implementation
- Error tracking service integration (Sentry)
- Standardized error response format
- Centralized error logging

### Build and Deployment

- Optimize build configuration
- CI/CD pipeline setup
- Environment-specific configurations
- Automated deployment strategy

### Code Quality Infrastructure

- Strict TypeScript configuration
- Enhanced ESLint rules
- Pre-commit hooks
- Code quality gates

### Monitoring and Logging

- Application performance monitoring
- Error tracking integration
- User behavior analytics
- System health metrics

## Technical Decisions

1. Use React.memo() for performance optimization
2. Implement code splitting using React.lazy()
3. Add TypeScript strict mode
4. Enhance ESLint configuration
5. Setup automated testing pipeline

# System Patterns: Career Platform Frontend

## Component Patterns

### Documentation Pattern

```
components/
└── ComponentName/
    ├── ComponentName.tsx     # Main component với JSDoc
    ├── ComponentName.test.tsx # Unit tests
    ├── ComponentName.stories.tsx # Storybook stories
    ├── index.ts             # Public API
    └── README.md           # Usage documentation
```

### Testing Pattern

1. Unit Tests Structure:

```typescript
describe('Component Name', () => {
  // Rendering tests
  it('renders correctly with default props');

  // Props tests
  it('handles different prop variations');

  // State tests
  it('manages state changes correctly');

  // Event tests
  it('handles user interactions');

  // Error tests
  it('handles errors gracefully');
});
```

2. Test Coverage Requirements:

- Components: 90%+ coverage
- Utils: 95%+ coverage
- Event handlers: 100% coverage

### Error Handling Pattern

1. Component Level:

```typescript
try {
  // Component logic
} catch (error) {
  // 1. Log to error service
  errorTracker.capture(error);

  // 2. Show user feedback
  toast.error(getUserFriendlyMessage(error));

  // 3. Fallback UI if needed
  return <ErrorFallback error={error} />;
}
```

2. Error Hierarchy:

```typescript
class ComponentError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ComponentError';
  }
}

class ValidationError extends ComponentError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
  }
}
```

## Development Patterns

### Documentation Standards

1. Component Documentation:

````typescript
/**
 * @component ComponentName
 * @description Brief description
 *
 * @example
 * ```tsx
 * <ComponentName prop="value" />
 * ```
 */
````

2. Props Documentation:

```typescript
interface ComponentProps {
  /** Description of prop */
  prop: PropType;
}
```

3. README Structure:

```markdown
# Component Name

Description

## Usage

## Props

## Examples

## Notes
```

### Testing Standards

1. Test File Organization:

```typescript
// 1. Imports
// 2. Mocks
// 3. Test Suite
// 4. Individual Tests
// 5. Helper Functions
```

2. Testing Priorities:

- User interactions
- Error states
- Edge cases
- Accessibility
- Performance

### Error Handling Standards

1. Error Types:

- ValidationErrors
- NetworkErrors
- StateErrors
- RenderErrors

2. Error Messages:

- User-friendly
- Actionable
- Consistent format

3. Error Recovery:

- Retry mechanisms
- Fallback UI
- State recovery

## Implementation Examples

### Button Component Example

Serves as reference implementation for:

- Component structure
- Documentation format
- Test coverage
- Error handling
- Accessibility
- Performance optimization
