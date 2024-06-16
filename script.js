//this is the api config from the openweathermap

const apiKey = "YOUR-API-KEY";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

var map = L.map('map').setView([51.505, -0.09], 13); // Initial coordinates
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);


// Function to fetch weather data and update UI
async function checkWeather(city) {
    try {
        const response = await fetch(`${apiUrl}${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        displayError();
    }
}

// Function to update weather information on the UI
function updateWeatherUI(data) {
    document.querySelector(".city").innerHTML = "🏠" + data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".description").innerHTML = data.weather[0].description;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".feels_like").innerHTML = Math.round(data.main.feels_like) + "°C";
    document.querySelector(".pressure").innerHTML = data.main.pressure + " hPa";
    document.querySelector(".country").innerHTML = data.sys.country;
    setWeatherIcon(data.weather[0].main);
    document.querySelector(".card").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

// Function to display error message
function displayError() {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".card").style.display = "none";
}

// Function to set weather icon based on weather condition
function setWeatherIcon(weatherCondition) {
    const iconMap = {
        "Clear": "assets/images/clear.png",
        "Clouds": "assets/images/clouds.png",
        "Drizzle": "assets/images/drizzle.png",
        "Rain": "assets/images/rain.png",
        "Mist": "assets/images/mist.png",
        "Snow": "assets/images/snow.png"
    };
    weatherIcon.src = iconMap[weatherCondition] || "assets/images/default.png";
}

// Function to locate and center the map on the specified city
function locateCity(city) {
    fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json`)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = data[0].lat;
                const lon = data[0].lon;
                map.setView([lat, lon], 13);
            }
        })
        .catch(error => console.error('Error:', error));
}

// Event listener for search button click
searchBtn.addEventListener("click", () => {
    const city = searchBox.value.trim();
    if (city) {
        checkWeather(city);
        locateCity(city);
    }
});

// Event listener for Enter key press in search input
searchBox.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = searchBox.value.trim();
        if (city) {
            checkWeather(city);
            locateCity(city);
        }
    }
});
