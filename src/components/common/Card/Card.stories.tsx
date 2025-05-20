import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';

const meta = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['elevated', 'outlined', 'filled'],
      description: 'The visual style variant of the card',
    },
    size: {
      control: 'radio',
      options: ['sm', 'md', 'lg'],
      description: 'The size (padding) of the card',
    },
    hoverable: {
      control: 'boolean',
      description: 'Whether to show hover effects',
    },
    isFullWidth: {
      control: 'boolean',
      description: 'Whether the card should take full width',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Base story
export const Default: Story = {
  args: {
    children: <div className="h-32 w-64">Default Card Content</div>,
    variant: 'elevated',
    size: 'md',
  },
};

// Variants
export const Elevated: Story = {
  args: {
    children: <div className="h-32 w-64">Elevated Card</div>,
    variant: 'elevated',
  },
};

export const Outlined: Story = {
  args: {
    children: <div className="h-32 w-64">Outlined Card</div>,
    variant: 'outlined',
  },
};

export const Filled: Story = {
  args: {
    children: <div className="h-32 w-64">Filled Card</div>,
    variant: 'filled',
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: <div className="h-24 w-48">Small Card</div>,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    children: <div className="h-32 w-64">Medium Card</div>,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    children: <div className="h-40 w-80">Large Card</div>,
    size: 'lg',
  },
};

// Interactive
export const Hoverable: Story = {
  args: {
    children: <div className="h-32 w-64">Hover me!</div>,
    hoverable: true,
  },
};

// Full width
export const FullWidth: Story = {
  args: {
    children: <div className="h-32">Full Width Card</div>,
    isFullWidth: true,
  },
};

// Complex example
export const ComplexCard: Story = {
  args: {
    variant: 'elevated',
    size: 'lg',
    hoverable: true,
    children: (
      <div className="space-y-4">
        <h3 className="text-xl font-bold">Card Title</h3>
        <p className="text-gray-600">This is a complex card example with multiple elements.</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Footer text</span>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md">Action</button>
        </div>
      </div>
    ),
  },
};
