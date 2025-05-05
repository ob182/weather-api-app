function getWeather() {
    const city = document.getElementById("cityInput").value;
    const apiKey = prompt("Enter your WeatherAPI.com key:");
    const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  
    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.error) {
          document.getElementById("weatherDisplay").innerHTML = "City not found!";
          return;
        }
  
        const location = data.location.name;
        const temp = data.current.temp_c;
        const condition = data.current.condition.text;
        const humidity = data.current.humidity;
  
        document.getElementById("weatherDisplay").innerHTML = `
          <h2>${location}</h2>
          <p><strong>Condition:</strong> ${condition}</p>
          <p><strong>Temperature:</strong> ${temp}°C</p>
          <p><strong>Humidity:</strong> ${humidity}%</p>
        `;
      })
      .catch(error => {
        console.error("Error:", error);
        document.getElementById("weatherDisplay").innerHTML = "Error fetching weather data.";
      });
  }

  
  