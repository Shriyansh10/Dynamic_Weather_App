import { useEffect, useState } from "react";
import getWeatherData from "./weather";

const cities = ["Hyderabad", "Rajahmundry", "Lucknow", "Raipur"];

/**
 * 1. Use the `cities` variable above to populate the dropdown (select) options.
 * 2. When the app loads, weather data for the first option i.e. `Hyderabad`
 *    should be fetched using the `getWeatherData` function and displayed
 *    inside the `p` element as text with the exact formatting preserved.
 * 3. When user selects a different city from the dropdown,
 *    use the function `getWeatherData` to get the latest weather information
 *    and replace the contents of the p element with the new data.
 * 4. Your task is o make sure all the tests pass.
 *    Refer to the `Tests` tab on the right.
 *
 */
export default function App() {
  const [city, setCity] = useState(cities[0]);
  const [weather, setWeather] = useState("");

  useEffect(() => {
    const fetchWeatherDetails = async (city) => {
      try {
        const data = await getWeatherData(city);
        setWeather(format(data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchWeatherDetails(city);
  }, [city]);

  const format = (data) => {
    const { temp, temp_max, temp_min, description } = data;
    return `${description}, ${temp}°C (Max ${temp_max}°C, Min ${temp_min}°C)`;
  };

  const handleChange = (event) => {
    setCity(event.target.value);
  };

  return (
    <div>
      <select onChange={handleChange} value={city}>
        {cities.map((city) => (
          <option key={city} value={city}>
            {city}
          </option>
        ))}
      </select>
      <br />
      <p data-testid="weather-result">{weather}</p>
    </div>
  );
}

/**
 * Hints:
 * 1. The result should be shown in p element already provided with data-testid
 *    as `weather-result`. Removing data-testid will cause the tests to fail.
 * 2. Only this file has to be modified. Any of the modifications in weather.js
 *    or the test files will be discarded.
 * 3. Data from getWeatherData will be a Promise that resolves to an object with 4 properties.
 *    {
 *      "description": "Sunny",
 *      "temp": 32,
 *      "temp_max": 34.6,
 *      "temp_min": 28.5,
 *    }
 *    Make sure that the text inside weather result is formatted exactly as
 *    `${description}, {temp}°C (Max ${temp_max}, Min ${temp_min})
 */
