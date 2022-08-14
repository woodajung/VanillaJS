const weatherIcon = document.querySelector("#weather #weatherImg");
const weather = document.querySelector("#weather #weatherText");
const city = document.querySelector("#weather #city");
const API_KEY = "9242767936164118db7fb13efac47c37"; // Custom
function onGeoOk(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric&lang=kr`;
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            weatherIcon.src = `img/weather/${data.weather[0].icon}.png`;
            city.innerText = data.name;
            weather.innerText = `${data.weather[0].main}, 온도 : ${data.main.temp}, 습도 : ${data.main.humidity}`;
        });
}
function onGeoError() {
    alert(`Can't find you. No weather for you.`);
}
// 브라우저 위치 정보
navigator.geolocation.getCurrentPosition(onGeoOk, onGeoError);