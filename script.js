const apiKey = "f1ef29950be2ee8c095b0d916207ec8e";

const weatherDataE1 = document.getElementById("weather-data");
const cityInputE1 = document.getElementById("city-input");
const formE1 = document.querySelector("form");

formE1.addEventListener("submit", (event) => {
  event.preventDefault();
  const cityValue = cityInputE1.value;

  getWeatherData(cityValue);
});

async function getWeatherData(cityValue) {
  try {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`);
    
    if (!response.ok) {
      throw new Error("Network response was not okay");
    }

    const data = await response.json();
    
    // Update the DOM with weather data
    displayWeatherData(data);
  } catch (error) {
    console.error(error);
  }
}

function displayWeatherData(data) {
  const { name, main, weather } = data;
  
  const temperature = main.temp;
  const description = weather[0].description;

  // Create an HTML element to display the weather data
  const weatherInfoElement = document.createElement("div");
  weatherInfoElement.classList.add("icon"); // Add class for icon styling
  weatherInfoElement.innerHTML = `
    <img src="images/openweathericon.png" alt="Weather Icon"> <!-- Keeping the original icon -->
    <div class="temperature">${temperature}°C</div>
    <div class="description">${description}</div>
    <div class="details">
        <div>Feels like: ${main.feels_like}°C</div>
        <div>Humidity: ${main.humidity}%</div>
        <div>Wind speed: ${data.wind.speed} m/s</div>
    </div>
  `;

  // Clear previous weather data and append the new data
  weatherDataE1.innerHTML = "";
  weatherDataE1.appendChild(weatherInfoElement);
}
