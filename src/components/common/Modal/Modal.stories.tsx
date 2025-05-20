import type { Meta, StoryObj } from '@storybook/react';
import Modal, { ModalProps } from './Modal';
import { useState } from 'react';

const meta: Meta<typeof Modal> = {
  title: 'Components/Modal',
  component: Modal,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', 'full'],
    },
    closeOnClickOutside: {
      control: 'boolean',
    },
    closeOnEsc: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

// Wrapper component to handle state
const ModalWrapper = (props: Omit<ModalProps, 'isOpen' | 'onClose'>) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
        Open Modal
      </button>
      <Modal {...props} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Default: Story = {
  render: (args) => (
    <ModalWrapper
      {...args}
      title="Example Modal"
      children={
        <div>
          <p>This is a basic modal with a title and content.</p>
          <p className="mt-4">Click outside or press ESC to close.</p>
        </div>
      }
    />
  ),
};

export const WithFooter: Story = {
  render: (args) => (
    <ModalWrapper
      {...args}
      title="Modal with Footer"
      children={<p>This modal includes a footer with action buttons.</p>}
      footer={
        <div className="flex justify-end space-x-2">
          <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Cancel</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">Save</button>
        </div>
      }
    />
  ),
};

export const CustomTitle: Story = {
  render: (args) => (
    <ModalWrapper
      {...args}
      title={
        <div className="flex items-center space-x-2">
          <svg className="h-6 w-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Custom Title with Icon</span>
        </div>
      }
      children={<p>This modal has a custom title component with an icon.</p>}
    />
  ),
};

export const LongContent: Story = {
  render: (args) => (
    <ModalWrapper
      {...args}
      title="Scrollable Content"
      children={
        <div className="space-y-4">
          {Array.from({ length: 10 }).map((_, i) => (
            <p key={i}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
              laboris nisi ut aliquip ex ea commodo consequat.
            </p>
          ))}
        </div>
      }
    />
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="space-y-4">
      {(['sm', 'md', 'lg', 'xl', 'full'] as const).map((size) => (
        <div key={size}>
          <ModalWrapper {...args} size={size} title={`${size.toUpperCase()} Modal`} children={<p>This is a {size} sized modal.</p>} />
        </div>
      ))}
    </div>
  ),
};

export const NoClickOutside: Story = {
  render: (args) => (
    <ModalWrapper
      {...args}
      title="Modal - Click Outside Disabled"
      closeOnClickOutside={false}
      children={
        <div>
          <p>This modal can only be closed using the X button.</p>
          <p className="mt-4">Clicking outside will not close it.</p>
        </div>
      }
    />
  ),
};
