import { render, screen } from '@testing-library/react';
import Card from '../Card';

describe('Card', () => {
  test('render đúng title, body, footer', () => {
    render(
      <Card title="Tiêu đề" footer={<div>Footer</div>}>
        Nội dung
      </Card>
    );
    expect(screen.getByText('Tiêu đề')).toBeInTheDocument();
    expect(screen.getByText('Nội dung')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  test('render headerAction nếu có', () => {
    render(
      <Card title="Tiêu đề" headerAction={<button>Action</button>}>
        Nội dung
      </Card>
    );
    expect(screen.getByText('Action')).toBeInTheDocument();
  });

  test('render loading overlay khi isLoading', () => {
    render(<Card isLoading>Body</Card>);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  test('áp dụng class w-full khi isFullWidth', () => {
    const { container } = render(<Card isFullWidth>Body</Card>);
    expect(container.firstChild).toHaveClass('w-full');
  });
});
