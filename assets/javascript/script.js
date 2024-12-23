const searchFormEl = document.querySelector("#search-form");
const cityNameEl= document.querySelector("#city-name");
const currentWeatherEl=document.querySelector("#current-weather")
const apiKey = "cf6b8ef31c485169dc6109681406854a"
const fiveDayEl =document.querySelector("#five-day")

//adding city list element 
const cityListEl = document.getElementById('city-list');


function searchCity(cityName){
populateCurrentWeather(cityName)
populate5Day(cityName);
}

function populateCurrentWeather(cityName){
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=imperial`;                 

 fetch(url)
.then(function(response){
  return response.json();
})
.then(function(data){


  currentWeatherEl.innerHTML=`<h3>${data.name} (${dayjs.unix(data.dt).format("MM/DD/YYYY")}) <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="" srcset=""></h3>
              <p> Temperature: <span>${data.main.temp}</span> </p>
              <p> Wind: <span>${data.wind.speed} MPH </span> </p>
              <p> Humidity: <span>${data.main.humidity}%</span> </p>`;
  console.log(data);
  let cities = JSON.parse(localStorage.getItem('cities')) || [];

      // Check if the city is  in the array
      if (!cities.includes(data.name)) {
        // Push the new city name into the array
        cities.push(data.name);
      }

      // Save the updated array back to local storage
      localStorage.setItem('cities', JSON.stringify(cities));
}) 


}
function populate5Day(cityName){
 const url = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}&units=imperial`
 fetch(url)
 .then(function(response){
  return response .json();
})
.then(function(data){
  console.log(data);

  fiveDayEl.textContent="";

  for(let i = 3; i < data.list.length; i=i+8){
    const forecast=data.list[i]
    console.log(forecast)
    fiveDayEl.innerHTML+=`<div class="col-sm-2 mb-3 mb-sm-0">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">${dayjs.unix(forecast.dt).format("MM/DD/YYYY")}</h5>
                  <img src="https://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" alt="" srcset=""></h3>
                  <p> Temperature: <span>${forecast.main.temp}°F</span> </p>
              <p> Wind: <span>${forecast.wind.speed} MPH </span> </p>
              <p> Humidity: <span>${forecast.main.humidity}%</span> </p>
                </div>
              </div>
            </div>`
}})
}
searchFormEl.addEventListener("submit", function(event){
  event.preventDefault();
  const cityName= cityNameEl.value;
  searchCity(cityName)
  cityNameEl.value = "";
  });

cityListEl.addEventListener('click', function(event){
  console.log('city-list');
  if (event.target.tagName === 'BUTTON') {
    const cityNames = event.target.textContent; // Get the city name from the clicked BUTTON
    searchCity(cityNames); // Call the searchCity function with the selected city name
  }
})

populateCurrentWeather('Miami');
populate5Day('Miami')