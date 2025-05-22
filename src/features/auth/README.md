# Authentication Feature

## Overview

The Authentication feature handles all user authentication-related functionality including login, registration, password recovery, and session management. This feature is built following Feature-Driven Development (FDD) and Domain-Driven Design (DDD) principles.

## Directory Structure

```
src/
└── features/
    ├── auth/                  # Feature xác thực
    │   ├── api/              # API calls liên quan đến auth
    │   │   ├── authApi.ts
    │   │   └── types.ts
    │   ├── components/       # UI Components của feature
    │   │   ├── LoginForm/
    │   │   ├── SignUpForm/
    │   │   └── ForgotPasswordForm/
    │   ├── hooks/           # Custom hooks của feature
    │   │   ├── useAuth.ts
    │   │   └── useAuthForm.ts
    │   ├── store/          # State management
    │   │   ├── authSlice.ts
    │   │   └── authSelectors.ts
    │   ├── utils/         # Utilities và helpers
    │   │   ├── authUtils.ts
    │   │   └── validation.ts
    │   ├── constants/    # Constants và enums
    │   │   └── authConstants.ts
    │   ├── pages/       # Page components
    │   │   ├── LoginPage.tsx
    │   │   └── SignUpPage.tsx
    │   └── index.ts     # Public API của feature
    │
    ├── user/            # Feature quản lý user
    │   ├── api/
    │   ├── components/
    │   ├── hooks/
    │   ├── store/
    │   ├── utils/
    │   ├── pages/
    │   └── index.ts
    │
    ├── profile/         # Feature profile
    │   ├── api/
    │   ├── components/
    │   ├── hooks/
    │   ├── store/
    │   ├── utils/
    │   ├── pages/
    │   └── index.ts
    │
    └── shared/          # Shared features/components
        ├── components/  # Shared UI components
        ├── hooks/      # Shared hooks
        ├── utils/      # Shared utilities
        └── types/      # Shared types
```

## Giải thích chi tiết về cấu trúc

1. **api/**

   - Chứa tất cả API calls liên quan đến feature
   - Định nghĩa types cho request/response
   - Xử lý logic gọi API và transform data

2. **components/**

   - Chứa các UI components của feature
   - Mỗi component có thể có folder riêng với cấu trúc:

   ```
   ComponentName/
   ├── ComponentName.tsx
   ├── ComponentName.test.tsx
   ├── ComponentName.stories.tsx
   ├── ComponentName.styles.ts (nếu dùng styled-components)
   └── index.ts
   ```

3. **hooks/**

   - Custom hooks dùng trong feature
   - Tách biệt logic nghiệp vụ khỏi components
   - Tái sử dụng logic giữa các components

4. **store/**

   - State management của feature (Redux/Zustand)
   - Chứa slices, selectors, actions
   - Quản lý trạng thái và side effects

5. **utils/**

   - Helper functions
   - Validation logic
   - Format và transform data
   - Các hàm tiện ích khác

6. **constants/**

   - Chứa các constants và enums
   - Configuration values
   - Route paths
   - API endpoints

7. **pages/**

   - Chứa các page components
   - Routing configuration
   - Layout management
   - Page-specific logic

8. **index.ts**
   - Public API của feature
   - Export các components, hooks, utils cần thiết
   - Entry point của feature

## Feature Organization Guide

### General Structure

```
src/
└── features/
    ├── feature1/           # Example: auth
    │   ├── api/           # API integration
    │   ├── components/    # UI Components
    │   ├── hooks/        # Custom hooks
    │   ├── store/        # State management
    │   ├── utils/        # Utilities
    │   ├── constants/    # Constants
    │   ├── pages/        # Pages
    │   └── index.ts      # Public API
    │
    ├── feature2/          # Example: user
    ├── feature3/          # Example: profile
    └── shared/            # Shared features
```

### Feature Examples

1. **User Management Feature**

```
user/
├── api/
│   ├── userApi.ts
│   └── types.ts
├── components/
│   ├── UserList/
│   ├── UserCard/
│   └── UserProfile/
├── hooks/
│   ├── useUser.ts
│   └── useUserForm.ts
├── store/
│   ├── userSlice.ts
│   └── userSelectors.ts
└── pages/
    └── UserDashboard.tsx
```

2. **Profile Feature**

```
profile/
├── api/
│   ├── profileApi.ts
│   └── types.ts
├── components/
│   ├── ProfileEditor/
│   ├── AvatarUpload/
│   └── ProfileSettings/
├── hooks/
│   └── useProfile.ts
└── store/
    └── profileSlice.ts
```

3. **Shared Feature**

```
shared/
├── components/
│   ├── Button/
│   ├── Input/
│   └── Modal/
├── hooks/
│   ├── useDebounce.ts
│   └── useLocalStorage.ts
└── utils/
    ├── validation.ts
    └── formatting.ts
```

### Best Practices

1. **Component Organization**

   ```
   ComponentName/
   ├── index.ts
   ├── ComponentName.tsx
   ├── ComponentName.test.tsx
   ├── ComponentName.stories.tsx
   ├── ComponentName.styles.ts
   └── types.ts
   ```

2. **API Integration**

   ```typescript
   // api/featureApi.ts
   export const featureApi = {
     getAll: () => axios.get('/endpoint'),
     getById: (id: string) => axios.get(`/endpoint/${id}`),
     create: (data: CreateDTO) => axios.post('/endpoint', data),
     update: (id: string, data: UpdateDTO) => axios.put(`/endpoint/${id}`, data),
     delete: (id: string) => axios.delete(`/endpoint/${id}`),
   };
   ```

3. **Store Structure**
   ```typescript
   // store/featureSlice.ts
   export const featureSlice = createSlice({
     name: 'feature',
     initialState,
     reducers: {
       setData: (state, action) => {},
       updateItem: (state, action) => {},
       removeItem: (state, action) => {},
     },
   });
   ```

### Feature Communication

1. **Event-Based**

   ```typescript
   // events/featureEvents.ts
   export const featureEvents = {
     ITEM_CREATED: 'feature/itemCreated',
     ITEM_UPDATED: 'feature/itemUpdated',
     ITEM_DELETED: 'feature/itemDeleted',
   };
   ```

2. **Shared State**
   ```typescript
   // store/sharedSlice.ts
   export const sharedSlice = createSlice({
     name: 'shared',
     initialState,
     reducers: {
       setGlobalData: (state, action) => {},
       updateConfig: (state, action) => {},
     },
   });
   ```

### Testing Strategy

1. **Unit Tests**

   ```typescript
   // Component.test.tsx
   describe('Component', () => {
     it('renders correctly', () => {});
     it('handles user interaction', () => {});
     it('manages state properly', () => {});
   });
   ```

2. **Integration Tests**
   ```typescript
   // feature.test.ts
   describe('Feature Integration', () => {
     it('works with other features', () => {});
     it('handles API calls', () => {});
     it('updates global state', () => {});
   });
   ```

### Documentation Requirements

Each feature should include:

1. README.md with:
   - Feature overview
   - Usage examples
   - API documentation
   - Configuration options
2. Component documentation
3. API endpoint documentation
4. State management documentation

### Performance Considerations

1. **Code Splitting**

   ```typescript
   // routes.ts
   const FeatureComponent = lazy(() => import('./features/feature'));
   ```

2. **State Optimization**
   ```typescript
   // selectors.ts
   export const selectFeatureData = createSelector([(state) => state.feature], (feature) => feature.data);
   ```

## Core Components

### LoginForm

A form component that handles user login with the following features:

- Email/password validation
- Error handling
- Loading states
- Remember me functionality
- OAuth integration (if applicable)

### SignUpForm

Registration form component with:

- User information collection
- Password strength validation
- Terms acceptance
- Email verification flow

### ForgotPasswordForm

Password recovery component supporting:

- Email verification
- Security questions
- Reset token handling

## Custom Hooks

### useAuth

Main authentication hook that provides:

```typescript
const { isAuthenticated, user, login, logout, register, resetPassword, updateProfile } = useAuth();
```

### useAuthForm

Form handling hook with:

- Form state management
- Validation
- Error handling
- Submission handling

## State Management

### Auth Slice

Redux slice managing:

- Authentication state
- User information
- Session tokens
- Loading states
- Error states

### Selectors

Optimized selectors for:

- User state
- Authentication status
- Permissions
- Token information

## API Integration

### authApi

Handles all authentication-related API calls:

- Login
- Registration
- Password reset
- Token refresh
- Session management

## Utils and Helpers

### Validation

- Email validation
- Password requirements
- Form field validation
- Security checks

### Auth Utils

- Token management
- Session handling
- Permission checking
- OAuth helpers

## Usage Examples

### Basic Authentication

```typescript
import { useAuth } from 'features/auth';

const MyComponent = () => {
  const { login, isAuthenticated } = useAuth();

  const handleLogin = async (credentials) => {
    try {
      await login(credentials);
      // Handle success
    } catch (error) {
      // Handle error
    }
  };

  return isAuthenticated ? <AuthenticatedApp /> : <LoginForm onSubmit={handleLogin} />;
};
```

### Protected Routes

```typescript
import { PrivateRoute } from 'features/auth';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route
      path="/dashboard"
      element={
        <PrivateRoute>
          <DashboardPage />
        </PrivateRoute>
      }
    />
  </Routes>
);
```

### Form Usage

```typescript
import { useAuthForm } from 'features/auth/hooks';

const LoginForm = () => {
  const { formState, handleSubmit, errors } = useAuthForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return <form onSubmit={handleSubmit}>{/* Form fields */}</form>;
};
```

## Configuration

### Environment Variables

```env
REACT_APP_AUTH_API_URL=https://api.example.com/auth
REACT_APP_AUTH_TOKEN_KEY=auth_token
REACT_APP_AUTH_REFRESH_TOKEN_KEY=refresh_token
```

### Constants

```typescript
export const AUTH_CONSTANTS = {
  TOKEN_EXPIRY: 3600,
  REFRESH_TOKEN_EXPIRY: 2592000,
  PASSWORD_MIN_LENGTH: 8,
  PASSWORD_PATTERN: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
};
```

## Testing

### Unit Tests

Each component and utility has corresponding test files:

- `*.test.tsx` for components
- `*.test.ts` for utilities and hooks

### Integration Tests

End-to-end authentication flows are tested using Cypress.

## Error Handling

The feature implements comprehensive error handling for:

- API errors
- Validation errors
- Network issues
- Session expiration
- Invalid tokens

## Security Considerations

- CSRF protection
- XSS prevention
- Secure token storage
- Rate limiting
- Session management
- Password hashing (backend)

## Contributing

When contributing to this feature:

1. Follow the established patterns
2. Update tests for new functionality
3. Document API changes
4. Consider security implications
5. Review error handling

## Dependencies

- @reduxjs/toolkit
- react-hook-form
- axios
- jwt-decode
- react-router-dom

## Future Improvements

- [ ] Implement 2FA
- [ ] Add social login
- [ ] Enhance password recovery flow
- [ ] Add biometric authentication
- [ ] Implement session tracking
