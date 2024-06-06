import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

// Mocking navigator.geolocation
beforeAll(() => {
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn((success) =>
      success({
        coords: {
          latitude: 51.1,
          longitude: 45.3
        }
      })
    )
  };
});



test('renders welcome message', () => {
  render(<App />);
  const element = screen.getByText(/Welcome to Weather Now/i);
  expect(element).toBeInTheDocument();
});
