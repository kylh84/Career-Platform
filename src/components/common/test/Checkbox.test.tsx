import { render, screen, fireEvent } from '@testing-library/react';
import Checkbox from '../Checkbox';

describe('Checkbox', () => {
  test('render label và checked', () => {
    render(<Checkbox label="Chọn tôi" checked />);
    expect(screen.getByLabelText('Chọn tôi')).toBeChecked();
  });

  test('hiển thị helperText', () => {
    render(<Checkbox helperText="Gợi ý" />);
    expect(screen.getByText('Gợi ý')).toBeInTheDocument();
  });

  test('hiển thị error', () => {
    render(<Checkbox error="Lỗi" />);
    expect(screen.getByText('Lỗi')).toBeInTheDocument();
  });

  test('gọi onChange khi click', () => {
    const onChange = jest.fn();
    render(<Checkbox label="Chọn" onChange={onChange} />);
    fireEvent.click(screen.getByLabelText('Chọn'));
    expect(onChange).toHaveBeenCalled();
  });
});
