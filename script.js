// Function to get weather data
function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '2b9e972f3ce16b993febed6c5fc54fbe'; // API Key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},CA&units=metric&appid=${apiKey}`;

    // Fetch weather data from OpenWeatherMap API
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found or API request failed');
            }
            return response.json();
        })
        .then(data => {
            if (data.cod === 404) {
                document.getElementById('weather-info').innerHTML = 'City not found. Please try again.';
            } else {
                const temperature = data.main.temp;
                const description = data.weather[0].description;
                const cityName = data.name;
                const icon = data.weather[0].icon;

                // Display weather data
                document.getElementById('weather-info').innerHTML = `
                    <h2>Weather in ${cityName}</h2>
                    <img src="https://openweathermap.org/img/wn/${icon}.png" alt="weather icon" />
                    <p>Temperature: ${temperature}°C</p>
                    <p>Description: ${description}</p>
                `;
            }
        })
        .catch(error => {
            document.getElementById('weather-info').innerHTML = `Error: ${error.message}. Please try again later.`;
            console.error('Error:', error);
        });
}
