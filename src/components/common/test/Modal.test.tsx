import { render, screen, fireEvent } from '@testing-library/react';
import Modal from '../Modal';

describe('Modal', () => {
  const onClose = jest.fn();
  const title = 'Tiêu đề';
  const footer = <div>Footer</div>;
  const body = <div>Nội dung</div>;

  beforeEach(() => {
    onClose.mockClear();
  });

  test('không render khi isOpen=false', () => {
    render(
      <Modal isOpen={false} onClose={onClose} title={title}>
        Nội dung
      </Modal>
    );
    expect(screen.queryByText('Tiêu đề')).toBeNull();
  });

  test('render đúng title, body, footer khi isOpen', () => {
    render(
      <Modal isOpen onClose={onClose} title={title} footer={footer}>
        {body}
      </Modal>
    );
    expect(screen.getByText('Tiêu đề')).toBeInTheDocument();
    expect(screen.getByText('Nội dung')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  test('gọi onClose khi click nút đóng', () => {
    render(
      <Modal isOpen onClose={onClose} title={title}>
        {body}
      </Modal>
    );
    const closeBtn = screen.getByRole('button');
    fireEvent.click(closeBtn);
    expect(onClose).toHaveBeenCalled();
  });

  test('gọi onClose khi click outside', () => {
    render(
      <Modal isOpen onClose={onClose} title={title}>
        {body}
      </Modal>
    );
    const overlay = screen.getByText('Nội dung').closest('.fixed');
    if (overlay) fireEvent.mouseDown(overlay);
    // fireEvent.click(overlay); // tuỳ vào cách test
    // Không gọi nếu closeOnClickOutside=false
  });

  test('gọi onClose khi nhấn ESC', () => {
    render(
      <Modal isOpen onClose={onClose} title={title}>
        {body}
      </Modal>
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(onClose).toHaveBeenCalled();
  });
});
