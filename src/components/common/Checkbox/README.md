# Checkbox Component

A flexible and accessible checkbox component with support for labels, descriptions, and error states.

## Features

- Multiple variants: primary, secondary, success, danger, warning
- Configurable sizes: sm, md, lg
- Support for labels and descriptions
- Error handling and validation states
- Fully typed with TypeScript
- Accessible (WAI-ARIA compliant)
- Keyboard navigation support

## Installation

The component is available as part of the common components:

```tsx
import Checkbox from '@/components/common/Checkbox';
```

## Usage

Basic usage:

```tsx
<Checkbox label="Accept terms" />
```

With variants:

```tsx
<Checkbox variant="primary" label="Primary" />
<Checkbox variant="secondary" label="Secondary" />
<Checkbox variant="success" label="Success" />
<Checkbox variant="danger" label="Danger" />
<Checkbox variant="warning" label="Warning" />
```

With sizes:

```tsx
<Checkbox size="sm" label="Small" />
<Checkbox size="md" label="Medium" />
<Checkbox size="lg" label="Large" />
```

With description:

```tsx
<Checkbox label="Newsletter" description="Receive updates about our products" />
```

With error state:

```tsx
<Checkbox label="Required field" isInvalid error="This field is required" />
```

Controlled component:

```tsx
const [checked, setChecked] = useState(false);

<Checkbox label="Controlled checkbox" checked={checked} onChange={(e) => setChecked(e.target.checked)} />;
```

Complex example:

```tsx
<Checkbox
  label={
    <div className="flex items-center">
      <span>Terms and Conditions</span>
      <span className="ml-1 text-blue-500">(Read more)</span>
    </div>
  }
  description="By checking this box, you agree to our Terms of Service"
  variant="primary"
  size="md"
  onChange={(e) => console.log('Checked:', e.target.checked)}
/>
```

## Props

| Prop             | Type                                                           | Default   | Description                        |
| ---------------- | -------------------------------------------------------------- | --------- | ---------------------------------- |
| label            | ReactNode                                                      | undefined | Label content                      |
| description      | ReactNode                                                      | undefined | Helper text below the label        |
| variant          | 'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning' | 'primary' | Visual style variant               |
| size             | 'sm' \| 'md' \| 'lg'                                           | 'md'      | Size of the checkbox               |
| error            | string                                                         | undefined | Error message                      |
| isInvalid        | boolean                                                        | false     | Whether the checkbox is invalid    |
| disabled         | boolean                                                        | false     | Whether the checkbox is disabled   |
| className        | string                                                         | ''        | Additional classes for the input   |
| wrapperClassName | string                                                         | ''        | Additional classes for the wrapper |

Plus all standard HTML input[type="checkbox"] props.

## Accessibility

The component follows WAI-ARIA best practices:

- Uses native checkbox input
- Associates labels with inputs
- Provides error feedback
- Supports keyboard navigation
- Maintains proper focus states
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
