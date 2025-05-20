import type { Meta, StoryObj } from '@storybook/react';
import { CiUser } from 'react-icons/ci';
import Select from './Select';

const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'success', 'danger', 'warning'],
    },
    isInvalid: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    isFullWidth: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Select>;

const options = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3', disabled: true },
  { value: '4', label: 'Option 4' },
];

export const Default: Story = {
  args: {
    options,
    placeholder: 'Select an option',
  },
};

export const WithLabel: Story = {
  args: {
    ...Default.args,
    label: 'Select Label',
    helperText: 'Helper text goes here',
  },
};

export const WithLeftIcon: Story = {
  args: {
    ...Default.args,
    label: 'User Type',
    leftIcon: <CiUser className="w-5 h-5" />,
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    label: 'Error State',
    isInvalid: true,
    error: 'Please select a valid option',
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Select {...args} size="sm" label="Small" />
      <Select {...args} size="md" label="Medium" />
      <Select {...args} size="lg" label="Large" />
    </div>
  ),
  args: {
    ...Default.args,
  },
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-4">
      <Select {...args} variant="primary" label="Primary" />
      <Select {...args} variant="secondary" label="Secondary" />
      <Select {...args} variant="success" label="Success" />
      <Select {...args} variant="danger" label="Danger" />
      <Select {...args} variant="warning" label="Warning" />
    </div>
  ),
  args: {
    ...Default.args,
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    label: 'Disabled Select',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    ...Default.args,
    label: 'Full Width Select',
    isFullWidth: true,
  },
};
