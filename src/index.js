// CONVERT temperature from °C to °F and vice-versa
let temperature = document.querySelector("#temperature");
let celciusTemperature = null;

//convert to celcius
function convertToCelcius(event) {
  event.preventDefault();
  // var fToCel = Math.round(((fTemp - 32) * 5) / 9);
  temperature.innerHTML = Math.round(celciusTemperature);
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");
}

let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", convertToCelcius);

//convert to fahrenheit
function convertToFahrenheit(event) {
  event.preventDefault();
  var cToFahr = Math.round((celciusTemperature * 9) / 5 + 32);
  temperature.innerHTML = cToFahr;
  celcius.classList.remove("active");
  fahrenheit.classList.add("active");
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", convertToFahrenheit);

// FORMAT of date and time
function formatDate(timeStamp) {
  let date = new Date(timeStamp);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDay = days[date.getDay()];
  let currentTime = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `Last updated: ${currentDay} ${currentTime},`;
}

//DISPLAY the name of the city searched and the current temp of that city
function fetchCityWeather(response) {
  let data = response.data;
  console.log(data);

  // City
  document.querySelector("#city-text").innerHTML = data.name;

  // Temperature
  celciusTemperature = data.main.temp;
  document.querySelector("#temperature").innerHTML =
    Math.round(celciusTemperature);

  // Temperature Description
  document.querySelector("#temp-description").innerHTML =
    data.weather[0].description;

  // Wind
  document.querySelector("#wind").innerHTML = `  Wind: ${Math.round(
    data.wind.speed
  )} km/h`;

  // Humidity
  document.querySelector("#humidity").innerHTML = ` Humidity: ${Math.round(
    data.main.humidity
  )}%`;

  // Date
  document.querySelector("#current-date").innerHTML = formatDate(
    data.dt * 1000
  );

  // Icon
  let iconElement = document.querySelector("#weather-icon");

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
  );
  iconElement.setAttribute("alt", data.weather[0].description);
}

function search(city) {
  let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(apiUrl).then(fetchCityWeather);
}

function handleCitySearch(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let citySearchForm = document.querySelector("#search-city");
citySearchForm.addEventListener("submit", handleCitySearch);

//HANDLE current button click
function getCurrentWeather(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;

  let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
  let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndPoint}?units=metric&lat=${lat}&lon=${long}&appid=${apiKey}`;

  axios.get(apiUrl).then(fetchCityWeather);
}

function handleCurrentBtnClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentWeather);
}

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", handleCurrentBtnClick);

search("Lagos");
