# Card Component

A flexible and reusable card component for displaying content in a contained, styled container.

## Features

- Multiple variants: elevated, outlined, filled
- Configurable sizes
- Hover effects
- Full width option
- Fully typed with TypeScript
- Accessible

## Installation

The component is available as part of the common components:

```tsx
import Card from '@/components/common/Card';
```

## Usage

Basic usage:

```tsx
<Card>
  <p>Basic card content</p>
</Card>
```

With variants:

```tsx
<Card variant="elevated">Elevated Card</Card>
<Card variant="outlined">Outlined Card</Card>
<Card variant="filled">Filled Card</Card>
```

With sizes:

```tsx
<Card size="sm">Small Card</Card>
<Card size="md">Medium Card</Card>
<Card size="lg">Large Card</Card>
```

With hover effect:

```tsx
<Card hoverable>
  <p>Hover me!</p>
</Card>
```

Full width:

```tsx
<Card isFullWidth>
  <p>Full width card</p>
</Card>
```

Complex example:

```tsx
<Card variant="elevated" size="lg" hoverable>
  <h3 className="text-xl font-bold">Card Title</h3>
  <p className="text-gray-600">Card content</p>
  <div className="flex justify-between items-center">
    <span>Footer</span>
    <button>Action</button>
  </div>
</Card>
```

## Props

| Prop        | Type                                 | Default    | Description                       |
| ----------- | ------------------------------------ | ---------- | --------------------------------- |
| variant     | 'elevated' \| 'outlined' \| 'filled' | 'elevated' | Visual style variant              |
| size        | 'sm' \| 'md' \| 'lg'                 | 'md'       | Size of the card padding          |
| hoverable   | boolean                              | false      | Whether to show hover effects     |
| isFullWidth | boolean                              | false      | Whether to take full width        |
| className   | string                               | ''         | Additional CSS classes            |
| children    | ReactNode                            | required   | Content to render inside the card |

Plus all standard HTML div props.

## Accessibility

The component follows accessibility best practices:

- Uses semantic HTML
- Maintains color contrast
- Supports keyboard navigation when hoverable

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
