import { useState, useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');
  const [isAdded, setIsAdded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { addFavorite } = useContext(WeatherContext);

  const apiKey = '57fd2b0235233e5bf4ab47ff911d0b88';

  const fetchWeather = async (e) => {
    e.preventDefault();
    setError('');
    setIsAdded(false);
    setIsLoading(true);
    
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
    } finally {
      setIsLoading(false);
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

  const getWeatherEmoji = (description) => {
    const desc = description.toLowerCase();
    if (desc.includes('clear')) return '☀️';
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain')) return '🌧️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('thunder')) return '⚡';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    return '🌤️';
  };

  const getTimeOfDay = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  const getGreeting = () => {
    const timeOfDay = getTimeOfDay();
    const greetings = {
      morning: '🌅 Good Morning!',
      afternoon: '☀️ Good Afternoon!',
      evening: '🌆 Good Evening!',
      night: '🌙 Good Night!'
    };
    return greetings[timeOfDay];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 pt-8 p-4 relative overflow-hidden flex items-start justify-center">
      {/* Enhanced floating background elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full blur-xl animate-bounce"></div>
      <div className="absolute bottom-20 right-20 w-24 h-24 bg-pink-400/20 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute top-1/3 right-10 w-40 h-40 bg-yellow-300/10 rounded-full blur-2xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute bottom-1/3 left-1/4 w-20 h-20 bg-cyan-400/15 rounded-full blur-lg animate-pulse" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-purple-400/20 rounded-full blur-md animate-bounce" style={{animationDelay: '0.5s'}}></div>
      
      <div className="w-full max-w-2xl">
        {/* Greeting section */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-semibold text-white/90 mb-2">
            {getGreeting()}
          </h3>
          <p className="text-white/60">Check the weather in any city around the world</p>
        </div>

        {/* Main container with enhanced glassmorphism */}
        <div className="backdrop-blur-xl bg-white/20 border border-white/30 rounded-3xl p-8 shadow-2xl hover:shadow-blue-500/25 transition-all duration-500 hover:scale-[1.01] hover:bg-white/25">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent mb-2">
              🌤️ Weather Search
            </h2>
            <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-purple-500 mx-auto rounded-full"></div>
          </div>

          {/* Search Form */}
          <form onSubmit={fetchWeather} className="space-y-6">
            <div className="relative group">
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name (e.g., London, Tokyo, New York)..."
                className="w-full px-6 py-4 bg-white/20 border border-white/30 rounded-2xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm transition-all duration-300 text-lg group-hover:bg-white/25"
                required
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/50 group-hover:text-white/70 transition-colors duration-200">
                🔍
              </div>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-cyan-500/25 transition-all duration-300 transform hover:scale-[1.02] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 group"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Searching...</span>
                </>
              ) : (
                <>
                  <span>Search Weather</span>
                  <span className="text-xl group-hover:animate-bounce">🚀</span>
                </>
              )}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm animate-pulse">
              <p className="text-red-200 text-center font-medium flex items-center justify-center space-x-2">
                <span>⚠️</span>
                <span>{error}</span>
              </p>
            </div>
          )}

          {/* Weather Results */}
          {weather && (
            <div className="mt-8 p-6 bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl backdrop-blur-sm shadow-xl animate-fade-in">
              {/* City Header with enhanced info */}
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-white mb-2 flex items-center justify-center space-x-2">
                  <span>📍</span>
                  <span>{weather.name}</span>
                </h3>
                <div className="flex items-center justify-center space-x-4 text-white/70">
                  <span className="capitalize">{weather.sys.country}</span>
                  <span>•</span>
                  <span>{new Date().toLocaleDateString()}</span>
                  <span>•</span>
                  <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </div>

              {/* Enhanced Weather Info Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                {/* Temperature */}
                <div className="bg-gradient-to-br from-orange-400/20 to-red-500/20 p-4 rounded-2xl border border-white/20 text-center hover:bg-gradient-to-br hover:from-orange-400/30 hover:to-red-500/30 transition-all duration-300 group">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">🌡️</div>
                  <div className="text-3xl font-bold text-white">{Math.round(weather.main.temp)}°C</div>
                  <div className="text-white/70 text-sm">Temperature</div>
                </div>

                {/* Feels Like */}
                <div className="bg-gradient-to-br from-blue-400/20 to-purple-500/20 p-4 rounded-2xl border border-white/20 text-center hover:bg-gradient-to-br hover:from-blue-400/30 hover:to-purple-500/30 transition-all duration-300 group">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">🤔</div>
                  <div className="text-3xl font-bold text-white">{Math.round(weather.main.feels_like)}°C</div>
                  <div className="text-white/70 text-sm">Feels like</div>
                </div>

                {/* Humidity */}
                <div className="bg-gradient-to-br from-cyan-400/20 to-blue-500/20 p-4 rounded-2xl border border-white/20 text-center hover:bg-gradient-to-br hover:from-cyan-400/30 hover:to-blue-500/30 transition-all duration-300 group">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">💧</div>
                  <div className="text-2xl font-bold text-white">{weather.main.humidity}%</div>
                  <div className="text-white/70 text-sm">Humidity</div>
                </div>

                {/* Wind */}
                <div className="bg-gradient-to-br from-green-400/20 to-teal-500/20 p-4 rounded-2xl border border-white/20 text-center hover:bg-gradient-to-br hover:from-green-400/30 hover:to-teal-500/30 transition-all duration-300 group">
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-200">💨</div>
                  <div className="text-2xl font-bold text-white">{weather.wind.speed} m/s</div>
                  <div className="text-white/70 text-sm">Wind Speed</div>
                </div>
              </div>

              {/* Additional Weather Info Row */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {/* Pressure */}
                <div className="bg-gradient-to-br from-indigo-400/20 to-purple-500/20 p-4 rounded-2xl border border-white/20 text-center hover:bg-gradient-to-br hover:from-indigo-400/30 hover:to-purple-500/30 transition-all duration-300">
                  <div className="text-2xl mb-2">🔽</div>
                  <div className="text-xl font-bold text-white">{weather.main.pressure} hPa</div>
                  <div className="text-white/70 text-sm">Pressure</div>
                </div>

                {/* Visibility */}
                <div className="bg-gradient-to-br from-yellow-400/20 to-orange-500/20 p-4 rounded-2xl border border-white/20 text-center hover:bg-gradient-to-br hover:from-yellow-400/30 hover:to-orange-500/30 transition-all duration-300">
                  <div className="text-2xl mb-2">👁️</div>
                  <div className="text-xl font-bold text-white">{weather.visibility ? `${(weather.visibility / 1000).toFixed(1)} km` : 'N/A'}</div>
                  <div className="text-white/70 text-sm">Visibility</div>
                </div>
              </div>

              {/* Weather Description */}
              <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 p-6 rounded-2xl border border-white/20 mb-6 text-center hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 transition-all duration-300">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <span className="text-5xl animate-pulse">{getWeatherEmoji(weather.weather[0].description)}</span>
                  <img
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt={weather.weather[0].description}
                    className="w-20 h-20 hover:scale-110 transition-transform duration-200"
                  />
                </div>
                <p className="text-white font-bold text-xl capitalize mb-2">{weather.weather[0].description}</p>
                <div className="flex items-center justify-center space-x-4 text-white/70 text-sm">
                  <span>Min: {Math.round(weather.main.temp_min)}°C</span>
                  <span>•</span>
                  <span>Max: {Math.round(weather.main.temp_max)}°C</span>
                </div>
              </div>

              {/* Add to Favorites Button */}
              <button
                onClick={handleAddFavorite}
                disabled={isAdded}
                className={`w-full font-bold py-4 px-6 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center justify-center space-x-2 group ${
                  isAdded 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-600 text-white cursor-not-allowed' 
                    : 'bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white hover:shadow-pink-500/25'
                }`}
              >
                <span className={`text-xl ${isAdded ? 'animate-bounce' : 'group-hover:rotate-12 transition-transform duration-200'}`}>
                  {isAdded ? '✅' : '⭐'}
                </span>
                <span>{isAdded ? 'Added to Favorites!' : 'Add to Favorites'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Quick Tips Section */}
        <div className="mt-6 backdrop-blur-lg bg-white/10 border border-white/20 rounded-2xl p-4">
          <div className="flex items-center justify-center space-x-6 text-white/70 text-sm">
            <div className="flex items-center space-x-2">
              <span>💡</span>
              <span>Try: &quot;London&quot;, &quot;Tokyo&quot;, &quot;New York&quot;</span>
            </div>
            <div className="hidden sm:flex items-center space-x-2">
              <span>🌍</span>
              <span>Search any city worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;