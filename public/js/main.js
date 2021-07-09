const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const cityCountry = document.getElementById('cityCountry');
const tempDiv = document.getElementById('tempDiv');
const temp = document.getElementById('temp');
const tempStatus = document.getElementById('tempStatus');
//set today's date
const day = document.getElementById('day');
const dateElem = document.getElementById('date');
var weekday = ["Sunday","Monday","Tue","Wed","Thursday","Friday","Saturday"];
var months = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec",];
let currentTime = new Date();
var month = months[currentTime.getMonth()];
var dateVal = currentTime.getDate();
day.innerText = weekday[currentTime.getDay()];
dateElem.innerText = `${dateVal} ${month}`;

const getWeatherInfo = async(event) => {
    event.preventDefault();
    const city = searchInput.value;
    if (city == "null") {
        cityCountry.innerText = 'Please enter a valid city name.';
        tempDiv.style.display = 'none'; 
    } else {
        try {
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=b561862117db84183d0c79246363a284`;
            const apiResponse = await fetch(apiUrl);
            const data = await apiResponse.json();
            const weatherDetails = [data];
            cityCountry.innerText = `${weatherDetails[0].name}, ${weatherDetails[0].sys.country}`;
            temp.innerText = weatherDetails[0].main.temp;
            const weather = weatherDetails[0].weather[0].main;
            if (weather == 'Clouds') {
                tempStatus.innerHTML = '<i class="fas fa-cloud"></i>';
            } else if (weather == 'Sun') {
                tempStatus.innerHTML = '<i class="fas fa-sun" style="color:#ff9800"></i>';
            } else if (weather == 'Rainy') {
                tempStatus.innerHTML = '<i class="fas fa-cloud-rain"></i>';
            }
            tempDiv.style.display = 'block';  
        } catch {
            cityCountry.innerText = 'Please enter a valid city name.';
            tempDiv.style.display = 'none';
        }
    }
}
searchButton.addEventListener('click', getWeatherInfo);
