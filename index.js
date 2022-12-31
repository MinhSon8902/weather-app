const ID = "352d82144cab1f88031a53ee7537c86c";
const searchInput = document.getElementById("search-input");
const cityName = document.querySelector(".weather-city");
const stateWeather = document.querySelector(".weather-state");
const weatherIcon = document.querySelector(".weather-icon");
const weatherTemp = document.querySelector(".weather-temp");

const sunrise = document.querySelector(".sunrise");
const sunset = document.querySelector(".sunset");
const humidity = document.querySelector(".humidity");
const wind = document.querySelector(".wind");

searchInput.addEventListener("change", (e) => {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${e.target.value}&appid=${ID}&units=metric&lang=vi`
  )
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        cityName.innerHTML = data.name || "--";
        stateWeather.innerHTML = data.weather[0].description || "--";
        weatherIcon.setAttribute(
          "src",
          `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
        );
        weatherTemp.innerHTML = Math.round(data.main.temp) || "--";

        sunrise.innerHTML =
          moment.unix(data.sys.sunrise).format("H:mm") || DEFAULT_VALUE;
        sunset.innerHTML =
          moment.unix(data.sys.sunset).format("H:mm") || DEFAULT_VALUE;
        humidity.innerHTML = data.main.humidity || DEFAULT_VALUE;
        wind.innerHTML = (data.wind.speed * 3.6).toFixed(2) || DEFAULT_VALUE;
      } else {
        return res.json().then((data) => {
          throw new Error(data?.message || "Some thing went wrong !");
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });
});
