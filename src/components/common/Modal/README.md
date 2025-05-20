# Modal Component

A flexible and accessible modal component for React applications with TypeScript support, built with Tailwind CSS.

## Features

- 🎨 Multiple size options (sm, md, lg, xl, full)
- 🎯 Custom title and footer support
- 🔒 Configurable closing behaviors (ESC key, click outside)
- 💪 Full TypeScript support
- ♿ WAI-ARIA compliant
- 📱 Responsive design
- 🔄 Body scroll lock when open
- 🎯 Custom styling via className props

## Installation

The component is part of the internal component library. No additional installation is required.

## Usage

```tsx
import { Modal } from '@/components/common';
// Or
import Modal from '@/components/common/Modal';

// Basic usage
const MyComponent = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      title="Example Modal"
    >
      <p>Modal content goes here</p>
    </Modal>
  );
};

// With footer
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Action"
  footer={
    <div className="flex justify-end space-x-2">
      <button onClick={handleClose}>Cancel</button>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  }
>
  <p>Are you sure you want to proceed?</p>
</Modal>

// Custom title component
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title={
    <div className="flex items-center">
      <Icon className="mr-2" />
      <span>Custom Title</span>
    </div>
  }
>
  <p>Modal with custom title component</p>
</Modal>
```

## Props

| Prop                  | Type                                     | Default  | Description                             |
| --------------------- | ---------------------------------------- | -------- | --------------------------------------- |
| `isOpen`              | `boolean`                                | Required | Controls modal visibility               |
| `onClose`             | `() => void`                             | Required | Function called when modal should close |
| `title`               | `string \| ReactNode`                    | -        | Modal title or custom title component   |
| `children`            | `ReactNode`                              | Required | Modal content                           |
| `footer`              | `ReactNode`                              | -        | Footer content                          |
| `size`                | `'sm' \| 'md' \| 'lg' \| 'xl' \| 'full'` | `'md'`   | Modal size                              |
| `closeOnClickOutside` | `boolean`                                | `true`   | Whether clicking outside closes modal   |
| `closeOnEsc`          | `boolean`                                | `true`   | Whether ESC key closes modal            |
| `className`           | `string`                                 | -        | Additional classes for modal container  |
| `backdropClassName`   | `string`                                 | -        | Additional classes for backdrop         |

## Sizes

The modal comes in five sizes:

- `sm`: 28rem (448px)
- `md`: 32rem (512px)
- `lg`: 42rem (672px)
- `xl`: 56rem (896px)
- `full`: Full width with margin

## Accessibility

The Modal component follows WAI-ARIA guidelines:

- Uses `role="dialog"` and `aria-modal="true"`
- Properly labels modal with `aria-labelledby`
- Provides accessible close button with proper aria-label
- Traps focus within modal when open
- Supports keyboard navigation
- Maintains proper document structure

## Examples

### Basic Modal

```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="Basic Modal">
  <p>This is a basic modal example.</p>
</Modal>
```

### Custom Size with Footer

```tsx
<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Large Modal"
  size="lg"
  footer={
    <div className="flex justify-end">
      <button onClick={handleClose}>Close</button>
    </div>
  }
>
  <p>This is a large modal with a footer.</p>
</Modal>
```

### Preventing Close

```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="Secure Modal" closeOnClickOutside={false} closeOnEsc={false}>
  <p>This modal can only be closed using the X button.</p>
</Modal>
```

### Custom Styling

```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="Styled Modal" className="bg-gray-100" backdropClassName="bg-blue-900 bg-opacity-50">
  <p>This modal has custom styling.</p>
</Modal>
```

## Testing

The component includes comprehensive tests covering:

- Rendering states
- User interactions
- Keyboard events
- Accessibility features
- Custom styling
- Size variations

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
