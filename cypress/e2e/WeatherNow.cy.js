describe('WeatherNow Uygulaması', () => {
  const mockWeatherData = {
    city: 'London',
    weather: [{ description: 'cloudy', icon: '03d' }],
    main: { temp: 14, feels_like: 12, humidity: 82, pressure: 1012 },
    wind: { speed: 4.6 },
  };

  beforeEach(() => {
    cy.visit('http://localhost:3000'); // Uygulamayı başlat
  });

  it('Uygulama yüklenir ve başlık görüntülenir', () => {
    cy.location('host').should('eq', 'localhost:3000')
    cy.location('port').should('eq', '3000')
    cy.url().should('eq', 'http://localhost:3000/')
    cy.title().should('eq', 'WeatherNow'); // Başlık etiketini kontrol et
  });

  it('Uygulama konum bilgisini kontrol eder; varsa, hava durumu bilgilerini gösterir', () => {
    cy.wait(2000)
    cy.get('.container > :nth-child(2)').then(($element) => {
      if ($element.text().includes('Error: Could not access your location. Please try searching for a city.')) {
        console.log('Please give permission to your location for better user experience')
      } else {
        cy.get('.weather').should('be.visible')
        cy.get('.city').should('be.visible')
        cy.get('.city').should('have.text', 'Umraniye')
        cy.get('.weather-description').should('be.visible')
        cy.get('.weather-description').should('have.text', 'scattered clouds')
        cy.get('.temperature').should('be.visible')
        cy.get('.temperature').should('have.text', '22°C')
        cy.get('.details').should('be.visible')
        cy.get('.details > :nth-child(4) > .parameter-label').should('have.text', 'Humidity')
        cy.get('.details > :nth-child(4) > .parameter-value').should('have.text', '69%')
        cy.get('.details > :nth-child(2) > .parameter-label').should('have.text', 'Feels like')
        cy.get('.details > :nth-child(2) > .parameter-value').should('have.text', '22°C')
        cy.get('.accordion').should('be.visible')
        cy.get('.accordion').should('be.visible')
        cy.get('.accordion > :nth-child(1)').should('be.visible')
        cy.get('.accordion > :nth-child(1) > .accordion__heading').click()
        cy.get('.accordion > :nth-child(1) > .accordion__heading > .accordion__button > .daily-item > .day').should('have.text', 'Saturday')
        cy.get('.accordion > :nth-child(1) > .accordion__panel > .daily-details-grid > :nth-child(2)').should('have.text', 'Humidity:81')
        cy.get('.accordion > :nth-child(7)').should('be.visible')
        cy.get('.accordion > :nth-child(7) > .accordion__heading').click()
        cy.get('.accordion > :nth-child(7) > .accordion__heading > .accordion__button > .daily-item > .day').should('have.text', 'Friday')
        cy.get('.accordion > :nth-child(7) > .accordion__panel > .daily-details-grid > :nth-child(4)').should('have.text', 'Wind speed:7.48 m/s')
      }
    }) 
  });

  it('Arama fonksiyonu ile API baplantısı test edilir', () => {
    cy.intercept('GET', '**/weather*').as('getWeather');
    cy.intercept('GET', '**/forecast*').as('getForecast');

    cy.get('.css-6j8wv5-Input').should('exist')
    cy.log('Input field exists');
    cy.get('.css-6j8wv5-Input').type('London');
    cy.log('Typed "London" into input field');
    cy.wait(2000)
    cy.get('#react-select-3-option-2').click();
    cy.log('Selected city from dropdown');

    cy.wait('@getWeather', { timeout: 2000 }).then((interception) => {
      cy.log('Weather API call made');
      expect(interception.response.statusCode).to.eq(200);
    });

    cy.wait('@getForecast', { timeout: 2000 }).then((interception) => {
      cy.log('Forecast API call made');
      expect(interception.response.statusCode).to.eq(200);
    });
  })

  it('Aranan şehir ile ilgili o günkü hava durumu bilgileri kontrol edilir', () => {
    cy.get('.css-6j8wv5-Input input').type('Berlin')
    cy.wait(2000);
    cy.get('#react-select-3-option-0').should('have.text', 'Berlin, DE').click()
    cy.get('.temperature').should('have.text', '14°C')
    cy.get('.details > :nth-child(2)').should('contain.text', '14°C')
    cy.get('.details > :nth-child(4)').should('contain.text', '82%')
  })

  it('Aranan şehir ile ilgili haftanın diğer günlerinin hava durumu bilgileri kontrol edilir', () => {
    cy.get('.css-6j8wv5-Input input').type('Berlin')
    cy.wait(2000);
    cy.get('#react-select-3-option-0').should('have.text', 'Berlin, DE').click()
    cy.get('.temperature').should('have.text', '14°C')
    cy.get('.details > :nth-child(2)').should('contain.text', '14°C')
    cy.get('.details > :nth-child(4)').should('contain.text', '82%')
    cy.get('.accordion').should('be.visible')
    cy.get('.accordion > :nth-child(1)').should('be.visible')
    cy.get('.accordion > :nth-child(1) > .accordion__heading').click()
    cy.get('.accordion > :nth-child(1) > .accordion__heading > .accordion__button > .daily-item > .day').should('have.text', 'Saturday')
    cy.get('.accordion > :nth-child(1) > .accordion__panel > .daily-details-grid > :nth-child(2)').should('have.text', 'Humidity:58')
    cy.get('.accordion > :nth-child(7)').should('be.visible')
    cy.get('.accordion > :nth-child(7) > .accordion__heading').click()
    cy.get('.accordion > :nth-child(7) > .accordion__heading > .accordion__button > .daily-item > .day').should('have.text', 'Friday')
    cy.get('.accordion > :nth-child(7) > .accordion__panel > .daily-details-grid > :nth-child(4)').should('have.text', 'Wind speed:3.86 m/s')
  })
});