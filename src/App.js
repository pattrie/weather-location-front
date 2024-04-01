import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [location, setLocation] = useState(false);
  const [weather, setWeather] = useState(false);

  let getWeather = async (lat, lon) => {
    console.log(lat, lon);
    try {
      const apiUrl = process.env.REACT_APP_WEATHER_LOCATION_URL;
      console.log(`API URL: ${apiUrl}`);
        let res = await axios.get(`${process.env.REACT_APP_WEATHER_LOCATION_URL}/api/v1/weather`, {
        headers: {
          latitude: lat,
          longitude: lon,
        },
      });
      setWeather(res.data);
    } catch (error) {
      alert("Erro ao obter a previsão do tempo");
    }
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      getWeather(position.coords.latitude, position.coords.longitude);
      setLocation(true);
    });
  }, []);

  if (!location) {
    return (
      <div>
        Necessário liberação de acesso a localização para ver a previsão...
      </div>
    );
  } else if (!weather || !weather.city) {
    return <div>Carregando previsão...</div>;
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h3 className="font-lobster text-center text-5xl mt-1">
          Clima das suas coordenadas - Cidade {weather.city}
        </h3>
        <div className="mt-8 container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
            {weather.prediction.map((day, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded">
                <h4 className="text-center text-lg font-semibold mb-2">
                  {day.day}
                </h4>
                <img src={day.icon} alt={day.status} className="mx-auto" />
                <ul>
                  <li>Temperatura atual: {day.degree}º</li>
                  <li>Temperatura máxima: {day.max}º</li>
                  <li>Temperatura mínima: {day.min}º</li>
                  <li>Umidade: {day.humidity}%</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
