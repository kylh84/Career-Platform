import { render, screen, fireEvent } from '@testing-library/react';
import Input from '../Input';

describe('Input', () => {
  test('render label và giá trị', () => {
    render(<Input label="Tên" value="A" onChange={() => {}} />);
    expect(screen.getByLabelText('Tên')).toHaveValue('A');
  });

  test('hiển thị helperText', () => {
    render(<Input helperText="Gợi ý" />);
    expect(screen.getByText('Gợi ý')).toBeInTheDocument();
  });

  test('hiển thị error', () => {
    render(<Input error="Lỗi" />);
    expect(screen.getByText('Lỗi')).toBeInTheDocument();
  });

  test('gọi onChange khi nhập', () => {
    const onChange = jest.fn();
    render(<Input label="Tên" onChange={onChange} />);
    fireEvent.change(screen.getByLabelText('Tên'), { target: { value: 'B' } });
    expect(onChange).toHaveBeenCalled();
  });
});
