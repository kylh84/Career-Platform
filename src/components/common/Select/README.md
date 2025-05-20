# Select Component

A customizable select component for React applications with TypeScript support, built with Tailwind CSS.

## Features

- 🎨 Multiple visual variants (primary, secondary, success, danger, warning)
- 📏 Different sizes (sm, md, lg)
- 🎯 Support for placeholder text
- 🔍 Left icon support
- ⚠️ Error state handling
- 💪 Full TypeScript support
- ♿ Accessibility features
- 📱 Responsive design with full-width option
- 🎯 Disabled state support
- 🔄 Custom styling via className props

## Installation

The component is part of the internal component library. No additional installation is required.

## Usage

```tsx
import { Select } from '@/components/common';
// Or
import Select from '@/components/common/Select';

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true },
];

// Basic usage
<Select options={options} placeholder="Select an option" />

// With label and helper text
<Select
  label="User Type"
  helperText="Please select a user type"
  options={options}
/>

// With error state
<Select
  label="Country"
  options={options}
  isInvalid
  error="Please select a country"
/>

// With left icon
import { CiUser } from 'react-icons/ci';

<Select
  label="User"
  leftIcon={<CiUser className="w-5 h-5" />}
  options={options}
/>

// Full width with custom variant
<Select
  label="Category"
  options={options}
  variant="success"
  isFullWidth
/>
```

## Props

| Prop               | Type                                                             | Default     | Description                               |
| ------------------ | ---------------------------------------------------------------- | ----------- | ----------------------------------------- |
| `options`          | `SelectOption[]`                                                 | Required    | Array of options to display               |
| `label`            | `React.ReactNode`                                                | -           | Label text or component                   |
| `helperText`       | `React.ReactNode`                                                | -           | Helper text below the select              |
| `size`             | `'sm' \| 'md' \| 'lg'`                                           | `'md'`      | Size of the select                        |
| `variant`          | `'primary' \| 'secondary' \| 'success' \| 'danger' \| 'warning'` | `'primary'` | Visual style variant                      |
| `leftIcon`         | `React.ReactNode`                                                | -           | Icon component to show on the left        |
| `error`            | `string`                                                         | -           | Error message to display                  |
| `isInvalid`        | `boolean`                                                        | `false`     | Whether the select is in an error state   |
| `isFullWidth`      | `boolean`                                                        | `false`     | Whether the select should take full width |
| `disabled`         | `boolean`                                                        | `false`     | Whether the select is disabled            |
| `placeholder`      | `string`                                                         | -           | Placeholder text (first option)           |
| `className`        | `string`                                                         | -           | Additional classes for the select element |
| `wrapperClassName` | `string`                                                         | -           | Additional classes for the wrapper div    |

The component also accepts all standard HTML select attributes.

## Types

```tsx
interface SelectOption {
  value: string | number;
  label: string;
  disabled?: boolean;
}

type SelectSize = 'sm' | 'md' | 'lg';
type SelectVariant = 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
```

## Accessibility

The Select component follows WAI-ARIA guidelines:

- Uses semantic `<select>` element
- Properly associates labels with inputs using `htmlFor`
- Includes `aria-invalid` for error states
- Provides `aria-describedby` for helper text and error messages
- Maintains keyboard navigation
- Supports screen readers with appropriate ARIA attributes

## Examples

### Different Sizes

```tsx
<Select size="sm" options={options} label="Small" />
<Select size="md" options={options} label="Medium" />
<Select size="lg" options={options} label="Large" />
```

### Different Variants

```tsx
<Select variant="primary" options={options} label="Primary" />
<Select variant="secondary" options={options} label="Secondary" />
<Select variant="success" options={options} label="Success" />
<Select variant="danger" options={options} label="Danger" />
<Select variant="warning" options={options} label="Warning" />
```

### With Error State

```tsx
<Select label="Country" options={options} isInvalid error="Please select a country" variant="danger" />
```

### With Left Icon and Helper Text

```tsx
<Select label="User Type" leftIcon={<CiUser className="w-5 h-5" />} helperText="Select the type of user account" options={options} />
```

## Testing

The component includes comprehensive tests covering:

- Basic rendering
- All props and features
- User interactions
- Accessibility features
- Styling variations

Run tests with:

```bash
npm test
# or
yarn test
```

## Storybook

View all component variations in Storybook:

```bash
npm run storybook
# or
yarn storybook
```
