const apiKey = '5097713e83e13521a7e1b6ccad2081cf';

function getWeather() {
    const city = document.getElementById('city-input').value;
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200) {
                displayWeather(data);
            } else {
                alert('City not found, please try again.');
            }
        })
        .catch(error => {
            alert('Error fetching data. Please check your internet connection or API key.');
            console.error(error);
        });
}

function displayWeather(data) {
    // Calculate local date using timezone offset
    const utcTimeInMs = data.dt * 1000; // Convert UTC time to milliseconds
    const timezoneOffsetInMs = data.timezone * 1000; // Convert timezone offset to milliseconds
    const localTime = new Date(utcTimeInMs + timezoneOffsetInMs);

    const dateString = localTime.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    document.getElementById('city-name').textContent = `Weather in ${data.name}`;
    document.getElementById('temperature').textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById('description').textContent = `Description: ${data.weather[0].description}`;
    document.getElementById('humidity').textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById('wind-speed').textContent = `Wind Speed: ${data.wind.speed} m/s`;
    document.getElementById('date-time').textContent = `Date: ${dateString}`;
}
