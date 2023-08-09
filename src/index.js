function searchForCity(event) {
  event.preventDefault();
  let searchCity = document.querySelector("#search-engine");
  let h1 = document.querySelector("h1");
  if (searchCity.value) {
    h1.innerHTML = `${searchCity.value}`;
  } else {
    h1.innerHTML = null;
    alert("Enter a valid city");
  }
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", searchForCity);

let now = new Date();

let hours = now.getHours();
let minutes = now.getMinutes();

let daysOfWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = daysOfWeek[now.getDay()];

let p = document.querySelector("#current-time");
p.innerHTML = `${day} ${hours}:${minutes}`;

let apiKey = "d09f23af6c4b890697b8cf39be4c6279";

function displayWeatherCondition(response) {
  document.querySelector("#city").textContent = response.data.name;
  document.querySelector(".current-temp").textContent = Math.round(
    response.data.main.temp
  );

  document.querySelector("#humidity").textContent = response.data.main.humidity;
  document.querySelector("#wind").textContent = Math.round(
    response.data.wind.speed
  );

  document.querySelector("#description").textContent =
    response.data.weather[0].main;
}

function searchCity(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector(".search-bar").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

searchForm.addEventListener("submit", handleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchCity("Nelspruit");
