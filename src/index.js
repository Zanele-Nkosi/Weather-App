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

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const city = document.getElementById("search-engine").value;
    getWeatherData(city);
  });

document
  .getElementById("current-location-button")
  .addEventListener("click", function () {
    getCurrentLocationWeather();
  });

function getWeatherData(city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      updateWeatherData(data);
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

function getCurrentLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
          .then((response) => response.json())
          .then((data) => {
            updateWeatherData(data);
          })
          .catch((error) => {
            console.error("Error fetching weather data:", error);
          });
      },
      function (error) {
        console.error("Error getting current location:", error);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

function updateWeatherData(data) {
  document.getElementById("city").textContent = data.name;

  let roundedTemp = Math.round(data.main.temp);
  document.getElementById("current-temp").textContent = `${roundedTemp} °C`;

  document.getElementById("humidity").textContent = data.main.humidity;

  document.getElementById("wind").textContent = data.wind.speed;
}
