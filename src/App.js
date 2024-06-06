import { useState, useEffect } from "react";
import Search from "./components/search/search";
import CurrentWeather from "./components/current-weather/current-weather";
import Forecast from "./components/forecast/forecast";
import { WEATHER_API_URL, WEATHER_API_KEY } from "./api";
import "./App.css";

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [locationError, setLocationError] = useState(false);

  useEffect(() => {
    const successCallback = (position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      fetchWeatherData(latitude, longitude); // Call to fetch weather data
    };
  
    const errorCallback = (error) => {
      console.error("Error getting location:", error.message);
      setLocationError(true); // Set location error state
    };
    // Fetch user location on component mount
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  }, []);

  const fetchWeatherData = async (lat, lon) => {
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    const forecastFetch = fetch(
      `${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );

    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        const forcastResponse = await response[1].json();

        setCurrentWeather({ city: weatherResponse.name, ...weatherResponse });
        setForecast({ city: weatherResponse.name, ...forcastResponse });
      })
      .catch(console.log);

      const appName = document.getElementById('appName');
      const appDesc = document.getElementById('appDesc');
      if (appName) {
        appName.style.display = "none";
      }
      if (appDesc) {
        appDesc.style.display = "none";
      }
  };

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    fetchWeatherData(lat, lon); // Call to fetch weather data
  };

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange} />
      {locationError && (
        <p>Error: Could not access your location. Please try searching for a city.</p>
      )}
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
      <h1 id="appName">Welcome to Weather Now</h1>
      <p id="appDesc">
        Weather Now puts the power of instant weather forecasting at your
        fingertips. With a simple and clean interface, you'll get the most
        up-to-date weather information for your city, all in a glance. Enter a
        city name to the search box and select the city. You will get all the
        weather information for your city up to 7 days!
      </p>
    </div>
  );
}

export default App;
