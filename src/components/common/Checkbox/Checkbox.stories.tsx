import type { Meta, StoryObj } from '@storybook/react';
import Checkbox from './Checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning'],
      description: 'The visual style variant of the checkbox',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'The size of the checkbox',
    },
    label: {
      control: 'text',
      description: 'Label text for the checkbox',
    },
    description: {
      control: 'text',
      description: 'Description text below the label',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the checkbox is in an error state',
    },
    error: {
      control: 'text',
      description: 'Error message to display',
    },
    checked: {
      control: 'boolean',
      description: 'Whether the checkbox is checked',
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base story
export const Default: Story = {
  args: {
    label: 'Default Checkbox',
  },
};

// Variants
export const Primary: Story = {
  args: {
    label: 'Primary Checkbox',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    label: 'Secondary Checkbox',
    variant: 'secondary',
  },
};

export const Success: Story = {
  args: {
    label: 'Success Checkbox',
    variant: 'success',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger Checkbox',
    variant: 'danger',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning Checkbox',
    variant: 'warning',
  },
};

// Sizes
export const Small: Story = {
  args: {
    label: 'Small Checkbox',
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium Checkbox',
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large Checkbox',
    size: 'lg',
  },
};

// States
export const Checked: Story = {
  args: {
    label: 'Checked Checkbox',
    checked: true,
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Checkbox',
    disabled: true,
  },
};

export const DisabledChecked: Story = {
  args: {
    label: 'Disabled Checked Checkbox',
    disabled: true,
    checked: true,
  },
};

export const WithError: Story = {
  args: {
    label: 'Error Checkbox',
    isInvalid: true,
    error: 'This field is required',
  },
};

// With description
export const WithDescription: Story = {
  args: {
    label: 'Checkbox with Description',
    description: 'This is a helpful description text that appears below the label.',
  },
};

// Complex example
export const ComplexExample: Story = {
  args: {
    label: (
      <div className="flex items-center space-x-2">
        <span className="font-medium">Terms and Conditions</span>
        <span className="text-sm text-blue-500">(Read more)</span>
      </div>
    ),
    description: 'By checking this box, you agree to our Terms of Service and Privacy Policy.',
    variant: 'primary',
    size: 'md',
  },
};
