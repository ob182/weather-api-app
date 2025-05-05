## API Credentials Setup & Security

This application uses the free [WeatherAPI.com](https://www.weatherapi.com/) service to fetch live weather data.

### How to Obtain an API Key

1. Go to [https://www.weatherapi.com](https://www.weatherapi.com)
2. Create a free account.
3. After signing in, navigate to your Dashboard.
4. Copy the free API key listed there.

### How This App Handles Your Key Securely

- The app **does not store or expose your API key in the source code**.
- When you first use the app, it will **prompt you to enter your API key**.
- The key is temporarily saved in your browser using **sessionStorage** — this means:
  - It stays available during the session (while the tab is open)
  - It is automatically cleared when the tab is closed or reloaded
- You can manually reset the key using the “Reset API Key” button

This approach ensures your key remains secure and complies with the assignment’s credential and security requirements.

Portions of this were enhanced with assistance from ChatGPT.
