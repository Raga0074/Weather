//this is the api config from the openweathermap

const apiKey ="b5673893492841b67eedbde47e72f700";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//this is variables for the elements on the html page that will be displayed 
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button"); 
const weatherIcon = document.querySelector(".weather-icon"); 

//this is the function that will be called when the search button is clicked
async function checkWeather(city){
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

//this is a condition that will be executed on the basis of users input
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".card").style.display = "none";
    }else{
        var data = await response.json();
//this is for the info which will be fetched to be displayed in the place of the classes
    document.querySelector(".city").innerHTML = "🏠" + data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".description").innerHTML = data.weather[0].description;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";
    document.querySelector(".feels_like").innerHTML = Math.round(data.main.feels_like) + "°C";
    document.querySelector(".pressure").innerHTML = data.main.pressure +"  "+ "hPa";
    document.querySelector(".country").innerHTML = data.sys.country;
//this is for the weather images to be matched with the weather data
    if (data.weather[0].main == "Clear") {
        weatherIcon.src = "assets/images/clear.png";
    }
    else if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "assets/images/clouds.png";
    }
    else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "assets/images/drizzle.png";
    }
    else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "assets/images/rain.png";
    }
    else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "assets/images/mist.png";
    }
    else if (data.weather[0].main == "Snow") {
        weatherIcon.src = "assets/images/snow.png";
    }

    document.querySelector(".card").style.display = "block";  
    document.querySelector(".error").style.display = "none";
    }

    
}

searchBtn.addEventListener("click", ()=>{
    checkWeather(searchBox.value);
})




