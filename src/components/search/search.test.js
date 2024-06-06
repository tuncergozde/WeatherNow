import { render, screen, fireEvent } from '@testing-library/react';
import Search from './search';

const mockOnSearchChange = jest.fn();

test('renders search component and handles input', async () => {
  render(<Search onSearchChange={mockOnSearchChange} />);

  // Şehri arama işlemi
  const input = screen.getByRole('combobox');
  fireEvent.change(input, { target: { value: 'Lon' } });

  // Şehir seçimini kontrol et (seçim yapılmadan önce bileşeni render edebilmek için basit kontrol)
  expect(input.value).toBe('Lon');
});
