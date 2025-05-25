import { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

function Favorites() {
  const { favorites, removeFavorite } = useContext(WeatherContext);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-6">
      <div className="container mx-auto max-w-4xl">
        {/* Header with glassmorphism effect */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-4">
            ✨ Favorite Cities
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-pink-500 to-cyan-500 mx-auto rounded-full"></div>
        </div>

        {favorites.length === 0 ? (
          <div className="backdrop-blur-lg bg-white/10 border border-white/20 rounded-3xl p-12 text-center shadow-2xl">
            <div className="text-6xl mb-6">🌟</div>
            <p className="text-white/80 text-xl font-medium">
              No favorite cities added yet.
            </p>
            <p className="text-white/60 text-sm mt-2">
              Start exploring and add your favorite places!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
            {favorites.map((city, index) => (
              <div
                key={city.name}
                className="group backdrop-blur-lg bg-gradient-to-r from-white/10 to-white/5 border border-white/20 rounded-3xl p-6 shadow-2xl hover:shadow-purple-500/25 transition-all duration-500 hover:scale-[1.02] hover:border-white/40"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    {/* City name with gradient */}
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent mb-4 group-hover:from-pink-300 group-hover:to-cyan-300 transition-all duration-300">
                      {city.name}
                    </h3>
                    
                    {/* Weather info cards */}
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl">🌡️</span>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm font-medium">Temperature</p>
                          <p className="text-white font-bold text-xl">{city.temp}°C</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                          <span className="text-white text-xl">☁️</span>
                        </div>
                        <div>
                          <p className="text-white/60 text-sm font-medium">Condition</p>
                          <p className="text-white font-bold capitalize">{city.description}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Remove button with hover effects */}
                  <button
                    onClick={() => removeFavorite(city.name)}
                    className="ml-4 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-2 group/btn"
                  >
                    <span className="group-hover/btn:rotate-12 transition-transform duration-200">🗑️</span>
                    <span>Remove</span>
                  </button>
                </div>
                
                {/* Animated background gradient on hover */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-600/0 via-pink-600/0 to-blue-600/0 group-hover:from-purple-600/5 group-hover:via-pink-600/5 group-hover:to-blue-600/5 transition-all duration-500 pointer-events-none"></div>
              </div>
            ))}
          </div>
        )}
        
        {/* Floating decoration elements */}
        <div className="fixed top-20 left-10 w-20 h-20 bg-gradient-to-br from-pink-400/20 to-purple-600/20 rounded-full blur-xl animate-pulse"></div>
        <div className="fixed bottom-20 right-10 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-cyan-600/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="fixed top-1/2 right-20 w-16 h-16 bg-gradient-to-br from-yellow-400/20 to-orange-600/20 rounded-full blur-xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>
    </div>
  );
}

export default Favorites;