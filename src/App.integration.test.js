import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  // Geolocation mock
  global.navigator.geolocation = {
    getCurrentPosition: jest.fn().mockImplementation((success) =>
      success({
        coords: {
          latitude: 51.1,
          longitude: 45.3,
        },
      })
    ),
  };
});

test('arama sonrası hava durumu verilerini getirir ve görüntüler', async () => {
  render(<App />);

  // Şehir ismi gir ve arama yap
  fireEvent.change(screen.getByRole('combobox'), { target: { value: 'London' } });
  fireEvent.keyDown(screen.getByRole('combobox'), { key: 'Enter', code: 'Enter' });

  // London seçeneğini bul ve tıkla
 // const londonOption = await waitFor(() => screen.findByText(/London, GB/i));
 // fireEvent.click(londonOption);

  // API çağrısını ve veri görüntülenmesini bekle
 // await waitFor(() => {
 //   expect(screen.getByText(/clear sky/i)).toBeInTheDocument();
   // expect(screen.getByText(/20/i)).toBeInTheDocument();
   // expect(screen.getByText(/18/i)).toBeInTheDocument();
  });
//});
