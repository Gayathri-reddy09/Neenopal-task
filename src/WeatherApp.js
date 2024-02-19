import React, { useState, useEffect, useCallback } from 'react';
import './WeatherApp.css';

const WeatherApp = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = '7ac9bb80537275c8ccb4fa35125bc1cf';

  const fetchWeatherData = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error('City not found or failed to fetch weather data');
      }
      const data = await response.json();
      setWeatherData(data);
      setError('');
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, [city, apiKey]);

  useEffect(() => {
    if (city) {
      fetchWeatherData();
    }
  }, [city, fetchWeatherData]);

  return (
    <div className="container">
      <div className='header'>
      <h1 className="title">Weather In Your City</h1>
      <div className="search-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            fetchWeatherData();
          }}
        >
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            required
          />
          <button type="submit">Search</button>
        </form>
        {loading && <div className="loader"></div>}
      </div>
      </div>
      {error && <p>{error}</p>}
      {weatherData && (
        <div>
          <h2>Weather forecast for {city}</h2>
          <div className="weather-tables">
            {Object.entries(weatherData.list.reduce((acc, item) => {
              const date = item.dt_txt.split(' ')[0];
              if (!acc[date]) {
                acc[date] = {
                  maxTemp: -Infinity,
                  minTemp: Infinity,
                  humidity: 0,
                  pressure: 0,
                  count: 0,
                };
              }
              acc[date].maxTemp = Math.max(acc[date].maxTemp, item.main.temp_max);
              acc[date].minTemp = Math.min(acc[date].minTemp, item.main.temp_min);
              acc[date].humidity += item.main.humidity;
              acc[date].pressure += item.main.pressure;
              acc[date].count++;
              return acc;
            }, {})).map(([date, data], index) => (
              <div key={index} className="weather-table">
                <table className="sub-table">
                  <tbody>
                    <tr>
                      <td colSpan="2">{date}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">Temperature</td>
                    </tr>
                    <tr>
                      <td>Min</td>
                      <td>Max</td>
                    </tr>
                    <tr>
                      <td>{data.minTemp}</td>
                      <td>{data.maxTemp}</td>
                    </tr>
                    <tr>
                      <td>Humidity</td>
                      <td>{data.humidity / data.count}</td>
                    </tr>
                    <tr>
                      <td>Pressure</td>
                      <td>{data.pressure / data.count}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherApp;
