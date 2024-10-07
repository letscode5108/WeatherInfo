import React, { createContext, useState, useEffect } from 'react';

export const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Retrieve favorite cities from local storage when the app loads
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favoriteCities')) || [];
    setFavorites(storedFavorites);
  }, []);

  // Add a city to favorites with a check for duplicates
  const addFavorite = (city) => {
    const cityExists = favorites.some((fav) => fav.name === city.name);
    if (cityExists) {
      alert(`${city.name} is already in your favorites.`);
      return;
    }
    const updatedFavorites = [...favorites, city];
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
   
  }

  // Remove a city from favorites
  const removeFavorite = (cityName) => {
    const updatedFavorites = favorites.filter((fav) => fav.name !== cityName);
    setFavorites(updatedFavorites);
    localStorage.setItem('favoriteCities', JSON.stringify(updatedFavorites));
  };

  return (
    <WeatherContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </WeatherContext.Provider>
  );
};


































// import React, { createContext, useState } from 'react';


// export const WeatherContext = createContext();


// export const WeatherProvider = ({ children }) => {
//   const [favorites, setFavorites] = useState([]);

 
//   const addFavorite = (city) => {
//     setFavorites([...favorites, city]);
//   };

  
//   const removeFavorite = (name) => {
//     setFavorites(favorites.filter((city) => city.name !== name));
//   };

//   return (
//     <WeatherContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
//       {children}
//     </WeatherContext.Provider>
//   );
// };
