const apiKey = "b101f2a0a1d225ce16d94eb2493f592b";
const locationInput = document.getElementById("location-input");
const todayWeatherDetails = document.getElementById("today-weather-details");
const hourlyForecastDetails = document.getElementById("hourly-forecast-details");
const fiveDayForecastDetails = document.getElementById("five-day-forecast-details");

document.getElementById("search").addEventListener("click", function () {
    const city = locationInput.value;
    if (city) {
        fetchWeather(city);
    }
});

function fetchWeather(city) {
    const todayUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const hourlyUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    const fiveDayUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(todayUrl)
        .then((response) => response.json())
        .then((data) => displayTodayWeather(data));

    fetch(hourlyUrl)
        .then((response) => response.json())
        .then((data) => displayHourlyForecast(data));

    fetch(fiveDayUrl)
        .then((response) => response.json())
        .then((data) => display5DayForecast(data));
}

function displayTodayWeather(data) {
    const tempCelsius = Math.floor(data.main.temp - 273.15);
    const weatherDescription = data.weather[0].description;
    const weatherIcon = data.weather[0].icon;

    todayWeatherDetails.innerHTML = `
        <div class="weather-detail">
            <h4>Temperature</h4>
            <p>${tempCelsius}°C</p>
        </div>
        <div class="weather-detail">
            <h4>Weather</h4>
            <p>${weatherDescription}</p>
        </div>
        <div class="weather-detail">
            <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
        </div>
    `;
}

function displayHourlyForecast(data) {
    const hourlyData = data.list.slice(0, 5);

    hourlyForecastDetails.innerHTML = "";

    hourlyData.forEach((hourData) => {
        const timestamp = hourData.dt * 1000;
        const date = new Date(timestamp);
        const tempCelsius = Math.floor(hourData.main.temp - 273.15);
        const weatherIcon = hourData.weather[0].icon;

        hourlyForecastDetails.innerHTML += `
            <div class="weather-detail">
                <h4>${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</h4>
                <p>${tempCelsius}°C</p>
                <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
            </div>
        `;
    });
}

function display5DayForecast(data) {
    const dailyData = data.list.filter((item, index) => index % 8 === 0);

    fiveDayForecastDetails.innerHTML = "";

    dailyData.forEach((dayData) => {
        const timestamp = dayData.dt * 1000;
        const date = new Date(timestamp);
        const tempMin = Math.floor(dayData.main.temp_min - 273.15);
        const tempMax = Math.floor(dayData.main.temp_max - 273.15);
        const weatherIcon = dayData.weather[0].icon;

        fiveDayForecastDetails.innerHTML += `
            <div class="weather-detail">
                <h4>${date.toLocaleDateString([], { weekday: 'short' })}</h4>
                <p>${tempMin}°C - ${tempMax}°C</p>
                <img src="http://openweathermap.org/img/wn/${weatherIcon}.png" alt="Weather Icon">
            </div>
        `;
    });
}
