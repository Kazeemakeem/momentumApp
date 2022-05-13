const API_KEY = "0a948423e993e99cf6a2561889f406c8";

function onGeoFine(position){
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    console.log('Your current location:', lat, long);
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}36&appid=${API_KEY}&unit=metric`
    console.log(url);
    fetch(url)
        .then(response => response.json())
        .then((data) => {
            const container = document.querySelector('#weather-container');
            const weatherContainer = container.querySelector('#weather');
            const tempContainer = container.querySelector('#temp');
            const locationContainer = container.querySelector('#location');

            weatherContainer.textContent = data.weather[0].main;
            tempContainer.textContent = data.main.temp;
            locationContainer.textContent = data.name;
            
        })
}

function onGeoError(){
    alert("Can't find you. No weather update")
}

navigator.geolocation.getCurrentPosition(onGeoFine, onGeoError)