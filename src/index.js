let dt = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let currentDay = days[dt.getDay()];
let currentTime = dt.getHours() + ":" + dt.getMinutes();
let currentDayTime = currentDay + " " + currentTime;
document.getElementById("date-time").innerHTML = currentDayTime;

function showCity(event) {
  event.preventDefault();
  let searchField = document.querySelector("#field");
  let city = document.querySelector("h1");
  city.innerHTML = searchField.value;
}

let message = document.querySelector("#float-left");
message.addEventListener("submit", showCity);

function clickFahrenheit(event) {
  event.preventDefault();
  let currentTemperature = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = Math.round(fahrenheitTemp);
}
function clickCelsius(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let currentTemperature = document.querySelector("#temperature");
  currentTemperature.innerHTML = Math.round(celsiusTemp);
}
let celsiusTemp = null;

let fahrenheitLink = document.querySelector("#temperature-f");
fahrenheitLink.addEventListener("click", clickFahrenheit);

let celsiusLink = document.querySelector("#temperature-c");
celsiusLink.addEventListener("click", clickCelsius);

let searchForm = document.querySelector("#float-left");
searchForm.addEventListener("submit", showCity);

function showTemperature(response) {
  let cityTemperature = document.querySelector("#temperature");
  celsiusTemp = response.data.main.temp;
  console.log(cityTemperature);
  console.log(response);
  let temperature = Math.round(celsiusTemp);
  cityTemperature.innerHTML = `${temperature}`;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = response.data.main.humidity;
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  getForecast(response.data.coord);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
        <div class="col-2">
          <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> ${Math.round(
              forecastDay.temp.max
            )}° </span>
            <span class="weather-forecast-temperature-min"> ${Math.round(
              forecastDay.temp.min
            )}° </span>
          </div>
        </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "cd146490f6193ead021b1eefbd8b6230";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function cityDisplay(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#field");
  let showCity = document.querySelector("#city");
  showCity.innerHTML = `${cityInput.value}`;
  let apiKey = "cd146490f6193ead021b1eefbd8b6230";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let cityForm = document.querySelector("#float-left");
cityForm.addEventListener("submit", cityDisplay);
