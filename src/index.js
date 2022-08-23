let dt = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
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
  let celsiusTemp = null;
  let currentTemperature = document.querySelector("#temperature");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemperature.innerHTML = `${Math.round(fahrenheitTemp)}°F`;
}
function clickCelsius(event) {
  event.preventDefault();
}
let fahrenheitLink = document.querySelector("#temperature-f");
fahrenheitLink.addEventListener("click", clickFahrenheit);

let celsiusLink = document.querySelector("#temperature-c");
celsiusLink.addEventListener("click", clickCelsius);

let searchForm = document.querySelector("#float-left");
searchForm.addEventListener("submit", cityDisplay);

function showTemperature(response) {
  let cityTemperature = document.querySelector("#temperature");
  console.log(cityTemperature);
  console.log(response);
  let temperature = Math.round(response.data.main.temp);
  cityTemperature.innerHTML = `${temperature} °C`;
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
}
function cityDisplay(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#field");
  let showCity = document.querySelector("#city");
  showCity.innerHTML = cityInput.value;
  let apiKey = "cd146490f6193ead021b1eefbd8b6230";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}
let cityForm = document.querySelector("#float-left");
cityForm.addEventListener("submit", cityDisplay);
