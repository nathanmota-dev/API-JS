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

const cityButtons = document.querySelectorAll(".city-button");

function traduzirDescricao(descricaoEmIngles) {
    const traducoes = {
        "clear sky": "céu limpo",
        "few clouds": "poucas nuvens",
        "scattered clouds": "nuvens dispersas",
        "broken clouds": "algumas nuvens",
        "overcast clouds": "nublado",
        "light rain": "chuva fraca",
        "moderate rain": "chuva moderada",
        "heavy intensity rain": "chuva intensa",
        "light snow": "neve fraca",
        "snow": "neve",
        "mist": "névoa",
    };

    return traducoes[descricaoEmIngles] || descricaoEmIngles;
}

//Passa como parametro as cidades dos botões pré-selecionadas
function buscarDadosECarregar(city) {
    showWeatherData(city);
}

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

    const descricaoEmIngles = data.weather[0].description;
    const descricaoEmPortugues = traduzirDescricao(descricaoEmIngles);
    descElement.innerText = descricaoEmPortugues;

    weatherIconElement.setAttribute("src", `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`);

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

cityButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const city = button.textContent;
        buscarDadosECarregar(city);
    });
});