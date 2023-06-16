export default function getWeatherData(city) {
  console.log(`Fetching data from weather api for city: ${city}`);
  return global
    .fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8dee0dbf17f272e4fefa8df470a7aa56&units=metric`
    )
    .then((response) => response.json())
    .then((data) => {
      const { temp, temp_max, temp_min } = data.main;
      const { description } = data.weather[0];
      return {
        temp,
        temp_max,
        temp_min,
        description
      };
    });
}
