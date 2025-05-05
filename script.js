let apiKey;
let useFahrenheit = false;

function resetApiKey() {
  sessionStorage.removeItem("weatherApiKey");
  apiKey = null;
  alert("API key cleared. Reload the page to enter a new one.");
}

function toggleUnits() {
  useFahrenheit = document.getElementById("unitToggle").checked;
  const city = document.getElementById("cityInput").value;
  if (city) getWeather();
}

function autocompleteCity() {
  const input = document.getElementById("cityInput").value;
  if (!input) return;

  if (!apiKey) {
    apiKey = sessionStorage.getItem("weatherApiKey");
    if (!apiKey) return;
  }

  fetch(`https://api.weatherapi.com/v1/search.json?key=${apiKey}&q=${input}`)
    .then(res => res.json())
    .then(data => {
      const suggestionBox = document.getElementById("suggestions");
      suggestionBox.innerHTML = "";
      data.forEach(location => {
        const li = document.createElement("li");
        li.textContent = location.name + ", " + location.country;
        li.onclick = () => {
          document.getElementById("cityInput").value = location.name;
          suggestionBox.innerHTML = "";
        };
        suggestionBox.appendChild(li);
      });
    });
}

function getWeather() {
  const city = document.getElementById("cityInput").value;
  const weatherDisplay = document.getElementById("weatherDisplay");
  const forecastDisplay = document.getElementById("forecastDisplay");
  weatherDisplay.innerHTML = "";
  forecastDisplay.innerHTML = "";

  if (!apiKey) {
    apiKey = sessionStorage.getItem("weatherApiKey");
    if (!apiKey) {
      apiKey = prompt("Enter your WeatherAPI.com key:");
      if (!apiKey) {
        alert("API key is required.");
        return;
      }
      sessionStorage.setItem("weatherApiKey", apiKey);
    }
  }

  fetch(`https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=5`)
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        weatherDisplay.innerHTML = "City not found or invalid API key.";
        return;
      }

      const current = data.current;
      const location = data.location;
      const forecast = data.forecast.forecastday;

      const temp = useFahrenheit ? current.temp_f : current.temp_c;
      const unit = useFahrenheit ? "°F" : "°C";

      weatherDisplay.innerHTML = `
        <h2>${location.name}, ${location.country}</h2>
        <p><strong>Local Time:</strong> ${location.localtime}</p>
        <img src="https:${current.condition.icon}" alt="weather icon">
        <p><strong>${current.condition.text}</strong></p>
        <p><strong>Temperature:</strong> ${temp}${unit}</p>
        <p><strong>Humidity:</strong> ${current.humidity}%</p>
      `;

      forecast.forEach(day => {
        const dayMax = useFahrenheit ? day.day.maxtemp_f : day.day.maxtemp_c;
        const dayMin = useFahrenheit ? day.day.mintemp_f : day.day.mintemp_c;

        const div = document.createElement("div");
        div.className = "forecast-day";
        div.innerHTML = `
          <h3>${day.date}</h3>
          <img src="https:${day.day.condition.icon}" alt="icon">
          <p>${day.day.condition.text}</p>
          <p>High: ${dayMax}${unit} / Low: ${dayMin}${unit}</p>
        `;
        forecastDisplay.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      weatherDisplay.innerHTML = "Error fetching weather data.";
    });
}

