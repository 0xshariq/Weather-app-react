import React, { useState, useEffect } from "react";

function Weather() {
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const handleReset = () => {
    setCity("");
    setData(null);
    setError("");
  };

  const handleSubmit = async () => {
    if (!city) {
      setError("City name is required.");
      return;
    }
    updateWeather();
  }
  const updateWeather = async () => {
    try {
      const apiUrl = `https://api.weatherapi.com/v1/current.json?key=af7e85bdbb3e46a7946145455241707&q=${city}`;
      const response = await fetch(apiUrl);

      if (!response.ok) {
        throw new Error("City not found");
      }

      const result = await response.json();
      setData(result);
      setError("");

    } catch (error) {
      console.error(error);
      setError(error.message);
      setData(null);
    }
  };

  useEffect(() => {
    if (city) {
      updateWeather();
    }
  }, []);

  return (
    <div className="container flex justify-center items-center my-10">
      <div className="contain w-9/12 flex flex-col justify-evenly items-center border mx-10">
        <h1 className="text-2xl text-center font-extrabold my-4">Weather App Using React</h1>
        <label htmlFor="cityName" className="text-center text-lg">Enter a City Name</label>
        <br />
        <input
          type="text"
          name="city"
          id="cityName"
          value={city}
          onChange={handleChange}
          className="w-3/5 border hover:border-orange-500 p-4 my-4 active:border-none"
        />
        <div className="weather-m">
          {error && <p className="error">{error}</p>}
          {data && (
            <div className="weather-info">
              <h2 className="font-extrabold text-lg text-center" style={{
                marginBottom: "1rem",
              }}>{data.location.name}</h2>
              <h2 className="font-extrabold text-lg text-center" style={{
                marginBottom: "1rem",
              }}>{data.location.region}</h2>
              <h2 className="font-extrabold text-lg text-center" style={{
                marginBottom: "1rem",
              }}>{data.location.country}</h2>
              <p className="font-bold text-lg">Temperature (in Celcius): {data.current.temp_c}°C</p>
              <p className="font-bold text-lg">Temperature (in Fahrenheit): {data.current.temp_f}°F</p>
              <p className="font-bold text-lg">Weather : {data.current.condition.text}</p>
              <p className="font-bold text-lg">Humidity : {data.current.humidity}%</p>
              <p className="font-bold text-lg">Wind Speed (kmph): {data.current.wind_kph} km/h</p>
              <p className="font-bold text-lg">Wind Speed (miles/hour): {data.current.wind_mph} m/h</p>
            </div>
          )}
        </div>
        <div className="btn m-4 mx-4 flex flex-row justify-between">
          <input
            type="button"
            value="Submit"
            id="submit"
            onClick={handleSubmit}
            className="py-3 px-4 mx-4 bg-gray-700 hover:bg-black text-white rounded-2xl"
          />
          <input
            type="button"
            value="Reset"
            id="reset"
            onClick={handleReset}
            className="px-4 py-3 mx-4 bg-gray-700 hover:bg-black text-white rounded-2xl"
          /> 
        </div>
      </div>
    </div>
  );
}

export default Weather;
