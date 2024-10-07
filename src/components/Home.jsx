import React, { useState, useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const { addFavorite } = useContext(WeatherContext);

  const apiKey = '57fd2b0235233e5bf4ab47ff911d0b88';

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError('');
    setIsAdded(false);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      if (!response.ok) {
        throw new Error('City not found. Please try again.');
      }
      const data = await response.json();
      console.log(data);
      setWeather(data);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleAddFavorite = () => {
    addFavorite({
      name: weather.name,
      temp: weather.main.temp,
      description: weather.weather[0].description,
    });
    setIsAdded(true);
  };

  return (
    <div className="flex items-center justify-center ">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-center">Search Weather</h2>
        <form onSubmit={fetchWeather} className="flex flex-col items-center">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="border rounded p-2 w-full mb-4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded w-full"
          >
            Search
          </button>
        </form>

        {error && <p className="text-red-500 mt-4">{error}</p>}
        {weather && (
          <div className="  mt-4 p-4 border rounded">
            <h3 className="text-xl font-bold">{weather.name}</h3>
            <p>Temperature: {weather.main.temp} °C</p>
            <p>Weather: {weather.weather[0].description}</p>
            <img
              src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
              alt={weather.weather[0].description}
              className="mt-2"
            />
            <button
              onClick={handleAddFavorite}
              className={`mt-4 text-white px-4 py-2 rounded w-full ${
                isAdded ? 'bg-green-500' : 'bg-blue-500'
              }`}
              disabled={isAdded}
            >
              {isAdded ? 'Added to Favorites' : 'Add to Favorites'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
