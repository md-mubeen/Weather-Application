const apiKey = "5a402fc5d9b3eb3df722161be15d353f";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const errorMsg = document.getElementById("error");

let isCelsius = true;

function toggleUnits() {
    isCelsius = !isCelsius;
    updateTemperatureDisplay();
}

function convertTemperature(temp) {
    if (!isCelsius) {
        return temp * 9/5 + 32;
    }
    return temp;
}

let currentTemp;

function checkWeather(city) {
    fetch(apiUrl + city + `&appid=${apiKey}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);

            document.querySelector(".city").textContent = data.name;
            currentTemp = data.main.temp;
            updateTemperatureDisplay();
            document.querySelector(".humidity").textContent = data.main.humidity + "%";
            document.querySelector(".wind").textContent = data.wind.speed + "km/h";
        })
        .catch(error => {
            console.log('Fetch error: ', error);
            errorMsg.textContent = "No data found";
            setTimeout(()=>{errorMsg.textContent=""},2000);
        });
}

function updateTemperatureDisplay() {
    let temperature = convertTemperature(currentTemp);
    document.querySelector(".temp").textContent = Math.round(temperature) + (isCelsius ? "°C" : "°F");
}

searchBtn.addEventListener("click",()=>{
    isCelsius = true;
    checkWeather(searchBox.value);
    searchBox.value="";
})

// Add event listener to unit toggle button
document.querySelector(".unit-toggle").addEventListener("click", toggleUnits);
