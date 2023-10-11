const apiKey = 'a3615badaf799009d8e5712db4845edb';
const searchBox = document.querySelector('.search input');

async function checkWeather(city, apiKey) {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=it`);
    var data = await response.json();

    console.log(data);

    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp) + '°';
    document.querySelector('.humidity').innerHTML = Math.round(data.main.humidity) + '%';
    document.querySelector('.wind').innerHTML = Math.round(data.wind.speed) + 'km/h';

    document.querySelector('.weather img').src=`./assets/images/${data.weather[0].main}.png`;

    searchBox.value = '';

    document.querySelector('.weather').style.cssText = 'display: block; transition: all 2s ease';
}

function cityName() {
    checkWeather(searchBox.value, apiKey)
}