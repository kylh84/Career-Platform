import { render, screen, fireEvent } from '@testing-library/react';
import Modal from './Modal';

describe('Modal', () => {
  const mockOnClose = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    // Reset body style after each test
    document.body.style.overflow = '';
  });

  it('renders nothing when isOpen is false', () => {
    render(
      <Modal isOpen={false} onClose={mockOnClose}>
        <div>Test Content</div>
      </Modal>
    );
    expect(screen.queryByText('Test Content')).not.toBeInTheDocument();
  });

  it('renders content when isOpen is true', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </Modal>
    );
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders with a title', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Title">
        <div>Test Content</div>
      </Modal>
    );
    expect(screen.getByText('Test Title')).toBeInTheDocument();
  });

  it('renders with a custom title component', () => {
    const CustomTitle = () => (
      <div>
        <span>Custom</span>
        <span>Title</span>
      </div>
    );
    render(
      <Modal isOpen={true} onClose={mockOnClose} title={<CustomTitle />}>
        <div>Test Content</div>
      </Modal>
    );
    expect(screen.getByText('Custom')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('renders with a footer', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} footer={<button>Test Footer Button</button>}>
        <div>Test Content</div>
      </Modal>
    );
    expect(screen.getByText('Test Footer Button')).toBeInTheDocument();
  });

  it('calls onClose when clicking outside the modal', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </Modal>
    );

    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not call onClose when clicking inside the modal', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </Modal>
    );

    const content = screen.getByText('Test Content');
    fireEvent.click(content);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('does not call onClose when clicking outside if closeOnClickOutside is false', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} closeOnClickOutside={false}>
        <div>Test Content</div>
      </Modal>
    );

    const backdrop = screen.getByRole('dialog');
    fireEvent.click(backdrop);
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('calls onClose when pressing Escape key', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).toHaveBeenCalled();
  });

  it('does not call onClose when pressing Escape if closeOnEsc is false', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} closeOnEsc={false}>
        <div>Test Content</div>
      </Modal>
    );

    fireEvent.keyDown(document, { key: 'Escape' });
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('renders with different sizes', () => {
    const sizes = ['sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full'] as const;
    const { rerender } = render(
      <Modal isOpen={true} onClose={mockOnClose} size="sm">
        <div>Test Content</div>
      </Modal>
    );

    sizes.forEach((size) => {
      rerender(
        <Modal isOpen={true} onClose={mockOnClose} size={size}>
          <div>Test Content</div>
        </Modal>
      );
      const modal = screen.getByRole('document');
      expect(modal).toHaveClass(`max-w-${size}`);
    });
  });

  it('applies custom className to modal container', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} className="custom-class">
        <div>Test Content</div>
      </Modal>
    );
    const modal = screen.getByRole('document');
    expect(modal).toHaveClass('custom-class');
  });

  it('applies custom backdropClassName to backdrop', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} backdropClassName="custom-backdrop">
        <div>Test Content</div>
      </Modal>
    );
    const backdrop = screen.getByRole('dialog');
    expect(backdrop).toHaveClass('custom-backdrop');
  });

  it('prevents body scrolling when modal is open', () => {
    const { unmount } = render(
      <Modal isOpen={true} onClose={mockOnClose}>
        <div>Test Content</div>
      </Modal>
    );
    expect(document.body.style.overflow).toBe('hidden');

    unmount();
    expect(document.body.style.overflow).toBe('');
  });

  it('maintains proper accessibility attributes', () => {
    render(
      <Modal isOpen={true} onClose={mockOnClose} title="Test Title">
        <div>Test Content</div>
      </Modal>
    );

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'modal-title');

    const closeButton = screen.getByLabelText('Close modal');
    expect(closeButton).toBeInTheDocument();
  });
});
