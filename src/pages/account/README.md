# Account Pages Documentation

## Overview

The Account section manages all user account-related functionalities, including profile management, security settings, and subscription handling.

## Components Structure

```
account/
├── components/
├── AccountLayout.tsx
├── EditProfile.tsx
├── Profile.tsx
├── Security.tsx
└── Subscription.tsx
```

## Page Components

### AccountLayout.tsx

Main layout wrapper for all account pages.

**Features:**

- Responsive sidebar navigation
- Mobile-friendly menu with overlay
- User authentication state management
- Consistent layout across all account pages
- Profile quick access
- Logout functionality

**Usage:**

```tsx
<AccountLayout>{/* Child account pages */}</AccountLayout>
```

### EditProfile.tsx

Profile editing interface with comprehensive form controls.

**Features:**

- Personal information form
- Profile picture upload/update
- Form validation
- Real-time updates
- Success/error notifications

### Profile.tsx

User profile display page.

**Features:**

- Personal information display
- Profile completeness indicator
- Activity history
- Achievement showcase
- Quick edit access

### Security.tsx

Account security management interface.

**Features:**

- Password management
- Two-factor authentication
- Security log display
- Account recovery options
- Session management

### Subscription.tsx

Subscription and billing management page.

**Features:**

- Current plan display
- Plan comparison
- Payment history
- Billing information
- Upgrade/downgrade options

## State Management

- Uses Redux for global user state
- React Context for theme/preferences
- Local state for form handling

## Styling

- Tailwind CSS for responsive design
- Custom components follow design system
- Mobile-first approach
- Dark/light mode support

## Common Props & Interfaces

```typescript
interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
  role: UserRole;
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: Date;
  activeSessions: Session[];
}

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  features: string[];
  current: boolean;
}
```

## Error Handling

- Form validation errors
- API error responses
- Network error states
- Loading states
- Fallback UI components

## Best Practices

1. Always wrap account pages with AccountLayout
2. Implement proper loading states
3. Handle all error cases
4. Use proper form validation
5. Implement proper security measures
6. Follow responsive design guidelines
7. Maintain consistent styling

## Related Components

- Toast notifications
- Loading spinners
- Error boundaries
- Form components
- Modal dialogs

## API Integration

Account pages interact with these API endpoints:

- `/api/user/profile`
- `/api/user/security`
- `/api/user/subscription`
- `/api/user/settings`

## Testing

- Unit tests for form validation
- Integration tests for API calls
- E2E tests for critical flows
- Accessibility testing
- Responsive design testing

## Responsive Design Guidelines

### Breakpoints

```typescript
const breakpoints = {
  xs: '320px', // Mobile small
  sm: '640px', // Mobile large
  md: '768px', // Tablet
  lg: '1024px', // Desktop
  xl: '1280px', // Large desktop
};
```

### Layout Adjustments

#### AccountLayout

- **Mobile (< 768px):**

  - Full-width sidebar with overlay
  - Hamburger menu toggle
  - Collapsed navigation
  - Sticky header
  - Bottom navigation bar option

- **Tablet (768px - 1024px):**

  - Collapsible sidebar
  - Semi-expanded navigation
  - Floating action buttons
  - Adaptive content width

- **Desktop (> 1024px):**
  - Fixed sidebar
  - Full navigation
  - Multi-column layout
  - Widescreen optimizations

### Component-Specific Adaptations

#### Profile & EditProfile

```scss
// Mobile adjustments
.profile-container {
  @apply px-4 py-4;

  @screen sm {
    @apply px-6 py-6;
  }

  @screen md {
    @apply px-8 py-8;
  }
}

// Form layouts
.form-grid {
  @apply grid gap-4;

  @screen sm {
    @apply grid-cols-2 gap-6;
  }

  @screen lg {
    @apply grid-cols-3 gap-8;
  }
}
```

#### Security & Subscription

- **Mobile:**

  - Stacked form elements
  - Full-width buttons
  - Simplified tables
  - Collapsible sections

- **Tablet:**

  - Two-column forms
  - Side-by-side comparisons
  - Expandable panels
  - Responsive tables

- **Desktop:**
  - Multi-column layout
  - Advanced data tables
  - Side panels
  - Tooltip interactions

### Typography Scaling

```scss
// Responsive typography
.heading-primary {
  @apply text-xl font-bold;

  @screen sm {
    @apply text-2xl;
  }

  @screen md {
    @apply text-3xl;
  }
}

.body-text {
  @apply text-sm leading-relaxed;

  @screen sm {
    @apply text-base;
  }
}
```

### Interactive Elements

#### Buttons & Inputs

```scss
// Responsive button sizing
.btn {
  @apply px-4 py-2 text-sm;

  @screen sm {
    @apply px-5 py-2.5 text-base;
  }

  @screen md {
    @apply px-6 py-3;
  }
}

// Form input scaling
.input-field {
  @apply p-2 text-sm;

  @screen sm {
    @apply p-3 text-base;
  }
}
```

### Navigation Patterns

#### Mobile Navigation

- Hamburger menu
- Bottom navigation bar
- Swipe gestures
- Touch-friendly targets
- Pull-to-refresh

#### Tablet Navigation

- Collapsible sidebar
- Dropdown menus
- Quick action buttons
- Search overlay
- Scroll-to-top

#### Desktop Navigation

- Persistent sidebar
- Hover states
- Keyboard shortcuts
- Multi-level menus
- Context menus

### Performance Considerations

#### Image Handling

```typescript
interface ResponsiveImage {
  mobile: string; // 320w
  tablet: string; // 768w
  desktop: string; // 1024w
  alt: string;
}
```

#### Loading Strategies

- Lazy loading for off-screen content
- Progressive image loading
- Skeleton screens per viewport
- Optimized asset delivery
- Conditional rendering

### Testing Checklist

1. **Mobile Testing:**

   - Touch interactions
   - Gesture support
   - Viewport meta tags
   - Soft keyboard handling
   - Network conditions

2. **Tablet Testing:**

   - Orientation changes
   - Split-screen modes
   - Stylus input
   - Medium-sized layouts
   - Touch/mouse hybrid

3. **Desktop Testing:**
   - Window resizing
   - High-DPI displays
   - Large screen layouts
   - Mouse interactions
   - Keyboard navigation

### Best Practices

1. Use relative units (rem, em, %)
2. Implement fluid typography
3. Test on real devices
4. Consider touch targets (min 44px)
5. Maintain content hierarchy
6. Optimize for performance
7. Ensure accessibility across devices
