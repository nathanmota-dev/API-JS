const apiKey = 'aeb2c10c0a3c32ecd512145640daebd7';
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search');

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherIconElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windElement = document.querySelector("#wind span");

const weatherContainer = document.querySelector("#weather-data");

const getWeatherData = async (city) => {

    const apiWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt-br`

    const res = await fetch(apiWeatherUrl);
    const data = await res.json();

    return data;
}

const showWeatherData = async (city) => {

    const data = await getWeatherData(city);

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

    // Obtenha o código do país da resposta da API OpenWeatherMap e use-o na URL da bandeira.
    const countryCode = data.sys.country;
    const apiCountryURL = `https://flagsapi.com/${countryCode}/flat/64.png`;
    countryElement.setAttribute("src", apiCountryURL);

    humidityElement.innerText = `${data.main.humidity}%`;
    windElement.innerText = `${data.wind.speed}km/h`;

    weatherContainer.classList.remove("hide");
};

searchBtn.addEventListener("click", (e) => {

    e.preventDefault();

    const city = cityInput.value;

    showWeatherData(city);

});

cityInput.addEventListener("keyup", (e) => {

    if (e.code === "Enter") {
        const city = e.target.value;

        showWeatherData(city);
    }
});
