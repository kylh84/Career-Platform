import { render, screen, fireEvent } from '@testing-library/react';
import Select from '../Select';

const options = [
  { value: '1', label: 'Một' },
  { value: '2', label: 'Hai' },
];

describe('Select', () => {
  test('render label và options', () => {
    render(<Select label="Chọn số" options={options} />);
    expect(screen.getByText('Chọn số')).toBeInTheDocument();
    expect(screen.getByText('Một')).toBeInTheDocument();
    expect(screen.getByText('Hai')).toBeInTheDocument();
  });

  test('hiển thị helperText', () => {
    render(<Select options={options} helperText="Gợi ý" />);
    expect(screen.getByText('Gợi ý')).toBeInTheDocument();
  });

  test('hiển thị error', () => {
    render(<Select options={options} error="Lỗi" />);
    expect(screen.getByText('Lỗi')).toBeInTheDocument();
  });

  test('gọi onChange khi chọn option', () => {
    const onChange = jest.fn();
    render(<Select options={options} onChange={onChange} />);
    fireEvent.change(screen.getByRole('combobox'), { target: { value: '2' } });
    expect(onChange).toHaveBeenCalled();
  });
});
