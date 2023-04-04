const APIKey = "ObblzJUWZwGRAjaG0pLA7GzAUm4itBaU";

const getCityUrl = (cityName) =>
  `http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${APIKey}&q=${cityName}`;

const fetchData = async (url) => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error("Não foi possível obter os dados");
    }
    return await response.json();
  } catch ({ name, message }) {
    alert(`${name}: ${message}`);
  }
};

const getCityData = (cityName) => fetchData(getCityUrl(cityName));

const getCityWeather = async (cityName) => {
  const [cityData] = await getCityData(cityName);
  const cityWeatherUrl = `http://dataservice.accuweather.com/currentconditions/v1/${cityData.Key}?apikey=${APIKey}&language=pt-br`;
  return await fetchData(cityWeatherUrl);
};

const pegarForm = document.querySelector('[data-js="change-location"]');
const pegarValorInput = document.querySelector(".form-control");
const nomeCidade = document.querySelector(".ahcinco");
const clima = document.querySelector('.clima')
const chovendoOuNao = document.querySelector('.chovendo')

pegarForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const chamarFunc = await getCityWeather(pegarValorInput.value);
  nomeCidade.innerText = pegarValorInput.value;
  clima.innerText = chamarFunc[0].Temperature.Metric.Value
  chovendoOuNao.innerText = chamarFunc[0].WeatherText
});
