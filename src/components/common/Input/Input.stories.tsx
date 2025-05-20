import type { Meta, StoryObj } from '@storybook/react';
import { CiMail } from 'react-icons/ci';
import Input from './Input';

const meta = {
  title: 'Components/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning'],
      description: 'The visual style variant of the input',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the input',
    },
    type: {
      control: 'select',
      options: ['text', 'password', 'email', 'number', 'tel', 'url', 'search'],
      description: 'The type of the input',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    helperText: {
      control: 'text',
      description: 'Helper text below the input',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the input is disabled',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the input is in an error state',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Whether the input takes full width',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base story
export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text...',
  },
};

// Variants
export const Primary: Story = {
  args: {
    label: 'Primary Input',
    variant: 'primary',
    placeholder: 'Primary input...',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Input',
    variant: 'secondary',
    placeholder: 'Secondary input...',
  },
};

export const Success: Story = {
  args: {
    label: 'Success Input',
    variant: 'success',
    placeholder: 'Success input...',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Input',
    variant: 'danger',
    placeholder: 'Danger input...',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning Input',
    variant: 'warning',
    placeholder: 'Warning input...',
  },
};

// Sizes
export const Small: Story = {
  args: {
    label: 'Small Input',
    size: 'sm',
    placeholder: 'Small input...',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Input',
    size: 'md',
    placeholder: 'Medium input...',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Input',
    size: 'lg',
    placeholder: 'Large input...',
  },
};

// Types
export const Password: Story = {
  args: {
    label: 'Password Input',
    type: 'password',
    placeholder: 'Enter password...',
  },
};

export const Email: Story = {
  args: {
    label: 'Email Input',
    type: 'email',
    placeholder: 'Enter email...',
  },
};

export const Number: Story = {
  args: {
    label: 'Number Input',
    type: 'number',
    placeholder: 'Enter number...',
  },
};

// States
export const Disabled: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    placeholder: 'Disabled input...',
  },
};

export const WithError: Story = {
  args: {
    label: 'Error Input',
    isInvalid: true,
    error: 'This field is required',
    placeholder: 'Error input...',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Input with Helper Text',
    helperText: 'This is a helpful description text.',
    placeholder: 'Enter text...',
  },
};

// With icons
export const WithLeftIcon: Story = {
  args: {
    label: 'Input with Left Icon',
    leftIcon: <span>🔍</span>,
    placeholder: 'Search...',
  },
};

export const WithRightIcon: Story = {
  args: {
    label: 'Input with Right Icon',
    rightIcon: <span>✉️</span>,
    placeholder: 'Enter email...',
  },
};

export const WithBothIcons: Story = {
  args: {
    label: 'Input with Both Icons',
    leftIcon: <span>🔍</span>,
    rightIcon: <span>✉️</span>,
    placeholder: 'Search email...',
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    label: 'Full Width Input',
    isFullWidth: true,
    placeholder: 'Full width input...',
  },
};

// Complex example
export const ComplexExample: Story = {
  args: {
    label: (
      <div className="flex items-center justify-between">
        <span>Email Address</span>
        <span className="text-sm text-blue-500">Required *</span>
      </div>
    ),
    type: 'email',
    placeholder: 'Enter your email',
    helperText: "We'll never share your email with anyone else.",
    leftIcon: <CiMail />,
    variant: 'primary',
    size: 'md',
    isFullWidth: true,
  },
};
