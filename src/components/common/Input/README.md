# Input Component

A flexible and accessible input component with support for labels, icons, and various states.

## Features

- Multiple variants: primary, secondary, success, danger, warning
- Configurable sizes: sm, md, lg
- Support for different input types
- Left and right icons
- Labels and helper text
- Error handling and validation states
- Fully typed with TypeScript
- Accessible (WAI-ARIA compliant)

## Installation

The component is available as part of the common components:

```tsx
import Input from '@/components/common/Input';
```

## Usage

Basic usage:

```tsx
<Input label="Username" placeholder="Enter username" />
```

With variants:

```tsx
<Input variant="primary" label="Primary" />
<Input variant="secondary" label="Secondary" />
<Input variant="success" label="Success" />
<Input variant="danger" label="Danger" />
<Input variant="warning" label="Warning" />
```

With sizes:

```tsx
<Input size="sm" label="Small" />
<Input size="md" label="Medium" />
<Input size="lg" label="Large" />
```

Different types:

```tsx
<Input type="text" label="Text" />
<Input type="password" label="Password" />
<Input type="email" label="Email" />
<Input type="number" label="Number" />
<Input type="tel" label="Telephone" />
<Input type="url" label="URL" />
<Input type="search" label="Search" />
```

With icons:

```tsx
<Input
  label="Search"
  leftIcon={<span>🔍</span>}
  placeholder="Search..."
/>

<Input
  label="Email"
  rightIcon={<span>✉️</span>}
  type="email"
/>
```

With helper text:

```tsx
<Input label="Username" helperText="Choose a unique username" placeholder="Enter username" />
```

With error state:

```tsx
<Input label="Email" type="email" isInvalid error="Please enter a valid email address" />
```

Full width:

```tsx
<Input label="Full Width Input" isFullWidth placeholder="This takes up all available space" />
```

Complex example:

```tsx
<Input
  label={
    <div className="flex items-center justify-between">
      <span>Email Address</span>
      <span className="text-sm text-blue-500">Required *</span>
    </div>
  }
  type="email"
  placeholder="Enter your email"
  helperText="We'll never share your email with anyone else"
  leftIcon={<span>✉️</span>}
  variant="primary"
  size="md"
  isFullWidth
/>
```

## Props

| Prop             | Type                                                           | Default   | Description                        |
| ---------------- | -------------------------------------------------------------- | --------- | ---------------------------------- |
| label            | ReactNode                                                      | undefined | Label content                      |
| helperText       | ReactNode                                                      | undefined | Helper text below the input        |
| variant          | 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' | 'primary' | Visual style variant               |
| size             | 'sm' \| 'md' \| 'lg'                                           | 'md'      | Size of the input                  |
| type             | InputType                                                      | 'text'    | Type of the input field            |
| leftIcon         | ReactNode                                                      | undefined | Icon to show on the left           |
| rightIcon        | ReactNode                                                      | undefined | Icon to show on the right          |
| error            | string                                                         | undefined | Error message                      |
| isInvalid        | boolean                                                        | false     | Whether the input is invalid       |
| isFullWidth      | boolean                                                        | false     | Whether to take full width         |
| disabled         | boolean                                                        | false     | Whether the input is disabled      |
| className        | string                                                         | ''        | Additional classes for the input   |
| wrapperClassName | string                                                         | ''        | Additional classes for the wrapper |

Plus all standard HTML input props.

## Accessibility

The component follows WAI-ARIA best practices:

- Uses semantic HTML
- Associates labels with inputs
- Provides error feedback
- Supports keyboard navigation
- Uses aria-invalid for error states
- Uses aria-describedby for descriptions

## Testing

Run the test suite:

```bash
npm test
```

## Stories

View all variants and test interactively in Storybook:

```bash
npm run storybook
```
