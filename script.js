const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const weatherResult = document.getElementById("weatherResult");
const locationText = document.getElementById("location");
const temperatureText = document.getElementById("temperature");
const descriptionText = document.getElementById("description");
const errorText = document.getElementById("error");

// Replace with your OpenWeatherMap API key
const apiKey = "YOUR_API_KEY_HERE";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error("City not found");
      }
      return response.json();
    })
    .then((data) => {
      displayWeather(data);
    })
    .catch((error) => {
      showError(error.message);
    });
}

function displayWeather(data) {
  errorText.textContent = "";
  locationText.textContent = `${data.name}, ${data.sys.country}`;
  temperatureText.textContent = `Temperature: ${data.main.temp} °C`;
  descriptionText.textContent = `Condition: ${data.weather[0].description}`;
  weatherResult.classList.remove("hidden");
}

function showError(message) {
  weatherResult.classList.add("hidden");
  errorText.textContent = message;
}
