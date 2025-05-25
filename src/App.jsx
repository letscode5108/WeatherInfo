import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Favorites from './components/Favorites';

// Navigation component to use useLocation hook
function Navigation() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="relative overflow-hidden">
      {/* Animated background with moving gradients */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500 animate-gradient-x"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-pink-500/20 via-transparent to-yellow-500/20"></div>
      
      {/* Floating orbs */}
      <div className="absolute top-4 left-20 w-16 h-16 bg-white/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-2 right-32 w-12 h-12 bg-cyan-300/20 rounded-full blur-lg animate-bounce"></div>
      <div className="absolute top-8 right-16 w-8 h-8 bg-pink-400/30 rounded-full blur-md animate-ping"></div>
      
      <div className="relative backdrop-blur-sm bg-white/10 border-b border-white/20 shadow-2xl">
        <div className="container mx-auto px-6 py-6">
          {/* Main title */}
          <div className="text-center mb-6">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent mb-2 hover:scale-105 transition-transform duration-300 cursor-default">
              🌈 Weather Dashboard
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-white to-purple-400 mx-auto rounded-full animate-pulse"></div>
          </div>
          
          {/* Navigation */}
          <nav className="backdrop-blur-lg bg-white/20 border border-white/30 rounded-3xl p-2 shadow-xl max-w-md mx-auto">
            <ul className="flex space-x-2">
              <li className="flex-1">
                <Link 
                  to="/" 
                  className={`flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 ${
                    isActive('/') 
                      ? 'bg-gradient-to-r from-white to-cyan-100 text-purple-600 shadow-lg shadow-white/25' 
                      : 'text-white hover:bg-white/20 hover:shadow-lg'
                  }`}
                >
                  <span className="text-xl">🏠</span>
                  <span>Home</span>
                  {isActive('/') && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full animate-bounce"></div>
                  )}
                </Link>
              </li>
              <li className="flex-1">
                <Link 
                  to="/favorites" 
                  className={`flex items-center justify-center space-x-2 px-6 py-4 rounded-2xl font-bold transition-all duration-300 transform hover:scale-105 relative ${
                    isActive('/favorites') 
                      ? 'bg-gradient-to-r from-white to-pink-100 text-purple-600 shadow-lg shadow-white/25' 
                      : 'text-white hover:bg-white/20 hover:shadow-lg'
                  }`}
                >
                  <span className="text-xl">⭐</span>
                  <span>Favorites</span>
                  {isActive('/favorites') && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-bounce"></div>
                  )}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      
      {/* Decorative bottom wave */}
      <div className="relative h-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-500"></div>
        <svg className="absolute bottom-0 w-full h-6" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,120 C150,90 350,90 600,120 C850,150 1050,150 1200,120 L1200,0 L0,0 Z" 
                fill="white" fillOpacity="0.1"></path>
        </svg>
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <Navigation />
        <main className="relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        
        {/* Floating background elements for the whole app */}
        <div className="fixed top-1/4 left-4 w-32 h-32 bg-gradient-to-br from-blue-400/10 to-purple-600/10 rounded-full blur-2xl animate-pulse pointer-events-none"></div>
        <div className="fixed bottom-1/4 right-8 w-24 h-24 bg-gradient-to-br from-pink-400/10 to-cyan-600/10 rounded-full blur-xl animate-pulse pointer-events-none" style={{animationDelay: '1s'}}></div>
        <div className="fixed top-1/2 left-1/3 w-40 h-40 bg-gradient-to-br from-yellow-400/10 to-orange-600/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{animationDelay: '2s'}}></div>
      </div>
      
      <style>{`
        @keyframes gradient-x {
          0%, 100% {
            background-position: 0% 50%;
            background-size: 200% 200%;
          }
          50% {
            background-position: 100% 50%;
            background-size: 200% 200%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 8s ease infinite;
        }
      `}</style>
    </Router>
  );
}

export default App;