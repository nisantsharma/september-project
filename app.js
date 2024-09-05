document.getElementById('fetchDataBtn').addEventListener('click', () => {
    document.getElementById('header').style.display = 'none';
    document.getElementById('welcome').style.display = 'block';
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else {
        alert('Geolocation is not supported by this browser.');
    }
});
   
function showPosition(position) {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(lat);
    console.log(lon);
    displayMap(lat, lon);
    fetchWeatherData(lat, lon);
    const currentloction = `
        <h2>here is your currnt location</h2>
        <p> lat:${lat}</p>
        <p>long: ${lon}</p>
    `;
    document.getElementById('h1').innerHTML = currentloction;
}
 
function showError(error) {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
}
function displayMap(lat, lon) {
    const mapSrc = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
    document.getElementById('map').innerHTML = `<iframe width="100%" height="400px" frameborder="0" style="border:0" src="${mapSrc}" allowfullscreen></iframe>`;
}
function fetchWeatherData(lat, lon) {
    const apiKey = 'ef37f1260623399a9d17e92dcc937795';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    fetch(url)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeather(data) {
    
    const date = new Date(data.dt * 1000);
    const istTime = new Intl.DateTimeFormat('en-IN', {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: 'Asia/Kolkata'
    }).format(date);
    const windDegrees = data.wind.deg;
    const windDirection = getWindDirection(windDegrees);
    let time = `Time (IST): ${istTime}`;
    let pressureInAtm = (data.main.pressure / 1013.25).toFixed(3);
   let speed = `Wind Speed: ${(data.wind.speed * 3.6).toFixed(2)} km/h`; 
   let temp= `Temperature: ${(data.main.temp-273.15).toFixed(2)}°C`;
   let feellike=`feels_like: ${(data.main.feels_like-273.15).toFixed(2)}°C`
   let description=`description: ${(data.weather[0].description)}`
   let pressur= `Pressure: ${pressureInAtm} atm`;
   let direction= `drection of wind: ${windDirection}`;
   let palce=`location: ${data.name}`
     console.log(data);
     console.log(palce);
     console.log(temp);
     console.log(speed);
     console.log(feellike);
     console.log(description);
     console.log(pressur)
     console.log(time);
     console.log(direction);
    const weatherDetails = `
        <h4>Your Weather data</h4>
        <p> ${palce}</p>
        <p> ${temp}</p>
        <p> ${feellike}%</p>
        <p> ${description}</p>
        <p> ${speed}</p>
        <p> ${direction}</p>
        <p> ${pressur}</p>
        <p>${time}</p>
    `;
    document.getElementById('weatherDetails').innerHTML = weatherDetails;
   
}
function getWindDirection(degrees) {
    if (degrees >= 0 && degrees < 22.5 || degrees >= 337.5 && degrees <= 360) return 'N';
    else if (degrees >= 22.5 && degrees < 67.5) return 'NE';
    else if (degrees >= 67.5 && degrees < 112.5) return 'E';
    else if (degrees >= 112.5 && degrees < 157.5) return 'SE';
    else if (degrees >= 157.5 && degrees < 202.5) return 'S';
    else if (degrees >= 202.5 && degrees < 247.5) return 'SW';
    else if (degrees >= 247.5 && degrees < 292.5) return 'W';
    else if (degrees >= 292.5 && degrees < 337.5) return 'NW';
}
