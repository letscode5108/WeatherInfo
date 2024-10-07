import React, { useContext } from 'react';
import { WeatherContext } from '../context/WeatherContext';

function Favorites() {
  const { favorites, removeFavorite } = useContext(WeatherContext);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Favorite Cities</h2>
      {favorites.length === 0 ? (
        <p className="text-gray-600">No favorite cities added.</p>
      ) : (
        <ul className="space-y-4">
          {favorites.map((city) => (
            <li
              key={city.name}
              className="p-4 border rounded shadow-md flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-bold">{city.name}</h3>
                <p>Temperature: {city.temp} °C</p>
                <p>Weather: {city.description}</p>
              </div>
              <button
                onClick={() => removeFavorite(city.name)}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favorites;





























// import React, { useContext } from 'react';
// import { WeatherContext } from '../context/WeatherContext';

// function Favorites() {
//   const { favorites, removeFavorite } = useContext(WeatherContext);

//   return (
//     <div className="container mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-4">Favorite Cities</h2>
//       {favorites.length === 0 ? (
//         <p className="text-gray-600">No favorite cities added.</p>
//       ) : (
//         <ul className="space-y-4">
//           {favorites.map((city) => (
//             <li
//               key={city.name}
//               className="p-4 border rounded shadow-md flex justify-between items-center"
//             >
//               <div>
//                 <h3 className="text-xl font-bold">{city.name}</h3>
//                 <p>Temperature: {city.temp} °C</p>
//                 <p>Weather: {city.description}</p>
                
  
//               </div>
//               <button
//                 onClick={() => removeFavorite(city.name)}
//                 className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//               >
//                 Remove
//               </button>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default Favorites;
