import { useState } from 'react';
import './App.css';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import CurrentWeather from './components/current-weather/current-weather';
import Search from './components/search/search';

function App() {
  const [currentWeather, setCurrentWeather] = useState(null);

  const handleOnSearchChange = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    );
    Promise.all([currentWeatherFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json();
        setCurrentWeather({ city: searchData.label, ...weatherResponse });
      })
      .catch(console.log);

  }

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather} />}
    </div>
  );
}

export default App;
