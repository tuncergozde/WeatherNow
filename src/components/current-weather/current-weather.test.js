import { render, screen } from '@testing-library/react';
import CurrentWeather from './current-weather';

const mockWeatherData = {
  city: 'London',
  weather: [{ description: 'cloudy', icon: '03d' }],
  main: { temp: 15, feels_like: 13, humidity: 82, pressure: 1012 },
  wind: { speed: 4.6 },
};

test('renders current weather component', () => {
  render(<CurrentWeather data={mockWeatherData} />);

  const cityElement = screen.getByText(/London/i);
  const descriptionElement = screen.getByText(/cloudy/i);
  const temperatureElement = screen.getByText(/15°C/i);
  const feelsLikeElement = screen.getByText(/13°C/i);
  const windElement = screen.getByText(/4.6 m\/s/i);
  const humidityElement = screen.getByText(/82%/i);
  const pressureElement = screen.getByText(/1012 hPa/i);

  expect(cityElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
  expect(temperatureElement).toBeInTheDocument();
  expect(feelsLikeElement).toBeInTheDocument();
  expect(windElement).toBeInTheDocument();
  expect(humidityElement).toBeInTheDocument();
  expect(pressureElement).toBeInTheDocument();
});
