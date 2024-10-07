import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { WeatherProvider } from './context/WeatherContext'; 
import { createRoot } from 'react-dom/client'  

createRoot(document.getElementById('root')).render(

 <WeatherProvider>
  <App />
</WeatherProvider>,

document.getElementById('root')
);
 

