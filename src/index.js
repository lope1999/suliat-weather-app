// CONVERT temperature from °C to °F and vice-versa
// let temperature = document.querySelector("#temperature");

// //convert to celcius
// function convertToCelcius(fTemp) {
//   var fToCel = Math.round(((fTemp - 32) * 5) / 9);
//   temperature.innerHTML = fToCel;
//   celcius.classList.remove("clickable-span");
//   fahrenheit.classList.add("clickable-span");
// }

// let celcius = document.querySelector("#celcius");
// celcius.addEventListener("click", () =>
//   convertToCelcius(temperature.innerHTML)
// );

// //convert to fahrenheit
// function convertToFahrenheit(cTemp) {
//   var cToFahr = Math.round((cTemp * 9) / 5 + 32);
//   temperature.innerHTML = cToFahr;
//   fahrenheit.classList.remove("clickable-span");
//   celcius.classList.add("clickable-span");
// }

// let fahrenheit = document.querySelector("#fahrenheit");

// if (fahrenheit.classList.contains("clickable-span")) {
//   fahrenheit.addEventListener("click", () =>
//     convertToFahrenheit(temperature.innerHTML)
//   );
// }

// DISPLAY of the current date and time
function getCurrentDate(date) {
  let dateText = document.querySelector("#current-date");
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
    // hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });

  dateText.innerHTML = `${currentDay} ${currentTime}`;
}
getCurrentDate(new Date());

//DISPLAY the name of the city searched and the current temp of that city
function fetchCityWeather(response) {
  let data = response.data;
  console.log(data);

  // City
  document.querySelector("#city-text").innerHTML = data.name;

  // Temperature
  document.querySelector("#temperature").innerHTML = Math.round(data.main.temp);

  // Temperature Description
  document.querySelector("#temp-description").innerHTML =
    data.weather[0].description;

  // Wind
  document.querySelector("#wind").innerHTML = Math.round(data.wind.speed);

  // Humidity
  document.querySelector("#humidity").innerHTML = Math.round(
    data.main.humidity
  );
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

function handleCurrentBtnClick() {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getCurrentWeather);
}

let currentBtn = document.querySelector("#current-btn");
currentBtn.addEventListener("click", handleCurrentBtnClick);

search("Lagos");
