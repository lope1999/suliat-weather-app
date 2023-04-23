let apiKey = "ab8e7ef210556986d1c9a75d6007b825";
let apiKeySheCodes = "1d70cafea07f1o13b5fd83b0630tfa4a";

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

function formatForecastDate(timeStamp) {
  let date = new Date(timeStamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

// DISPLAY the weather-forecast
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row mb-3">`;
  forecast.forEach(function (day, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
            <span class="weather-forecast-span">
                  <img src=${day.condition.icon_url} width=70/>
                  <div>
                    <strong class="weather-forecast-date">${formatForecastDate(
                      day.time
                    )}</strong>
                    <br />
                    <div>
                      <span class="weather-forecast-temperature-max">${Math.round(
                        day.temperature.maximum
                      )}°</span>
                      <span class="weather-forecast-temperature-min">${Math.round(
                        day.temperature.minimum
                      )}°</span>
                    </div>
                  </div>
                </span>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

// DISPLAY the name of the city searched and the current temp of that city
// function fetchCityWeather(response) {
//   let data = response.data;
//   console.log(data);

//   // City
//   document.querySelector("#city-text").innerHTML = data.name;

//   // Temperature
//   celciusTemperature = data.main.temp;
//   document.querySelector("#temperature").innerHTML =
//     Math.round(celciusTemperature);

//   // Temperature Description
//   document.querySelector("#temp-description").innerHTML =
//     data.weather[0].description;

//   // Wind
//   document.querySelector("#wind").innerHTML = `  Wind: ${Math.round(
//     data.wind.speed
//   )} km/h`;

//   // Humidity
//   document.querySelector("#humidity").innerHTML = ` Humidity: ${Math.round(
//     data.main.humidity
//   )}%`;

//   // Date
//   document.querySelector("#current-date").innerHTML = formatDate(
//     data.dt * 1000
//   );

//   // Icon
//   let iconElement = document.querySelector("#weather-icon");

//   iconElement.setAttribute(
//     "src",
//     `http://openweathermap.org/img/w/${data.weather[0].icon}.png`
//   );
//   iconElement.setAttribute("alt", data.weather[0].description);
// }

function getForecast(coordinates) {
  let apiEndPointSheCodes = "https://api.shecodes.io/weather/v1/forecast";
  let apiUrlSheCodes = `${apiEndPointSheCodes}?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKeySheCodes}`;

  axios.get(apiUrlSheCodes).then(displayForecast);
}

// SHECODES URL
function fetchCityWeatherSheCodes(response) {
  let data = response.data;
  console.log(data);

  // City
  document.querySelector(
    "#city-text"
  ).innerHTML = `${data.city}, ${data.country}`;

  // Temperature
  celciusTemperature = data.temperature.current;
  document.querySelector("#temperature").innerHTML =
    Math.round(celciusTemperature);

  // Temperature Description
  document.querySelector("#temp-description").innerHTML =
    data.condition.description;

  // Wind
  document.querySelector("#wind").innerHTML = `  Wind: ${Math.round(
    data.wind.speed
  )} km/h`;

  // Humidity
  document.querySelector("#humidity").innerHTML = ` Humidity: ${Math.round(
    data.temperature.humidity
  )}%`;

  // Date
  document.querySelector("#current-date").innerHTML = formatDate(
    data.time * 1000
  );

  // Icon
  let iconElement = document.querySelector("#weather-icon");
  iconElement.setAttribute("src", data.condition.icon_url);
  iconElement.setAttribute("alt", data.condition.description);

  // Get forecast with coordinates
  getForecast(data.coordinates);
}

function search(city) {
  // let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  // let apiUrl = `${apiEndPoint}?q=${city}&units=metric&appid=${apiKey}`;

  let apiEndPointSheCodes = "https://api.shecodes.io/weather/v1/current";
  let apiUrlSheCodes = `${apiEndPointSheCodes}?query=${city}&key=${apiKeySheCodes}`;

  axios.get(apiUrlSheCodes).then(fetchCityWeatherSheCodes);
}

function handleCitySearch(event) {
  event.preventDefault();

  // remove the active class on °F and add to °C
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");

  let city = document.querySelector("#city-input").value;
  city = city.trim();
  if (city.length > 0) {
    search(city);
  } else {
    alert("Please enter a city name!");
  }
}

let citySearchForm = document.querySelector("#search-city");
citySearchForm.addEventListener("submit", handleCitySearch);

//HANDLE current button click
function getCurrentWeather(position) {
  // remove the active class on °F and add to °C
  fahrenheit.classList.remove("active");
  celcius.classList.add("active");

  let long = position.coords.longitude;
  let lat = position.coords.latitude;

  // let apiEndPoint = "https://api.openweathermap.org/data/2.5/weather";
  // let apiUrl = `${apiEndPoint}?units=metric&lat=${lat}&lon=${long}&appid=${apiKey}`;

  let apiEndPointSheCodes = "https://api.shecodes.io/weather/v1/current";
  let apiUrlSheCodes = `${apiEndPointSheCodes}?lon=${long}&lat=${lat}&key=${apiKeySheCodes}`;

  axios.get(apiUrlSheCodes).then(fetchCityWeatherSheCodes);
}

function handleCurrentBtnClick(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentWeather);
}

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", handleCurrentBtnClick);

search("Lagos");
