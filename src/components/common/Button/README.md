# Button Component

A versatile button component with various styles and states.

## Features

- Multiple variants (primary, secondary, success, etc.)
- Different sizes (sm, md, lg)
- Loading state with spinner
- Support for left and right icons
- Full width option
- Keyboard accessibility
- Error handling
- TypeScript support

## Installation

The Button component is part of the common components library. No additional installation is needed.

## Usage

```tsx
import { Button } from '@/components/common';

// Basic usage
<Button>Click me</Button>

// With variant and size
<Button variant="primary" size="lg">
  Large Primary Button
</Button>

// Loading state
<Button isLoading>Processing...</Button>

// With icons
<Button leftIcon={<Icon />} rightIcon={<Icon />}>
  With Icons
</Button>

// Full width
<Button isFullWidth>Full Width Button</Button>
```

## Props

| Prop        | Type                                                                                                    | Default   | Description                                     |
| ----------- | ------------------------------------------------------------------------------------------------------- | --------- | ----------------------------------------------- |
| variant     | 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' \| 'info' \| 'light' \| 'dark' \| 'link' | 'primary' | Visual style of the button                      |
| size        | 'sm' \| 'md' \| 'lg'                                                                                    | 'md'      | Size of the button                              |
| isLoading   | boolean                                                                                                 | false     | Shows a loading spinner and disables the button |
| isFullWidth | boolean                                                                                                 | false     | Makes the button take full width of container   |
| leftIcon    | ReactNode                                                                                               | undefined | Icon to show before button text                 |
| rightIcon   | ReactNode                                                                                               | undefined | Icon to show after button text                  |
| disabled    | boolean                                                                                                 | false     | Disables the button                             |
| className   | string                                                                                                  | ''        | Additional CSS classes                          |

Plus all standard button HTML attributes.

## Examples

### All Variants

```tsx
const variants = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link'];

{
  variants.map((variant) => (
    <Button key={variant} variant={variant}>
      {variant} button
    </Button>
  ));
}
```

### With Loading State

```tsx
const [isLoading, setIsLoading] = useState(false);

<Button
  isLoading={isLoading}
  onClick={() => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 2000);
  }}
>
  Click to load
</Button>;
```

### With Icons

```tsx
<Button variant="primary" leftIcon={<ArrowLeftIcon />} rightIcon={<ArrowRightIcon />}>
  Navigate
</Button>
```

## Error Handling

The component includes built-in error handling:

1. Validates variant prop and throws ButtonError for invalid values
2. Handles click and keyboard event errors gracefully
3. Integrates with error tracking service (when configured)

## Accessibility

- Proper ARIA attributes for loading and disabled states
- Keyboard navigation support (Enter and Space keys)
- Icons are properly hidden from screen readers
- Focus management for disabled state

## Testing

The component comes with comprehensive tests covering:

- Rendering with different props
- User interactions
- Keyboard accessibility
- Error cases
- Loading states
- Icon rendering

Run tests with:

```bash
npm test -- Button
```

## Contributing

When modifying this component:

1. Update tests for new functionality
2. Maintain accessibility features
3. Document new props or features
4. Consider backward compatibility
