import { render, screen } from '@testing-library/react';
import Forecast from './forecast';

const mockForecastData = {
  list: [
    {
      main: { temp_max: 20, temp_min: 10, pressure: 1012, humidity: 80, sea_level: 1024, feels_like: 18 },
      weather: [{ description: 'clear sky', icon: '01d' }],
      clouds: { all: 0 },
      wind: { speed: 1.5 },
      dt_txt: '2024-06-10 12:00:00'
    },
    {
      main: { temp_max: 25, temp_min: 15, pressure: 1010, humidity: 75, sea_level: 1022, feels_like: 22 },
      weather: [{ description: 'partly cloudy', icon: '02d' }],
      clouds: { all: 20 },
      wind: { speed: 3.0 },
      dt_txt: '2024-06-11 12:00:00'
    },
  ],
};

test('renders forecast component with basic structure', () => {
  render(<Forecast data={mockForecastData} />);

  // Temel bileşenlerin render edilip edilmediğini kontrol et
  expect(screen.getByText(/Daily/i)).toBeInTheDocument();
  expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
  expect(screen.getByText(/partly cloudy/i)).toBeInTheDocument();
  expect(screen.getAllByRole('img')).toHaveLength(2); // İki hava durumu ikonu olduğundan emin olun
});
