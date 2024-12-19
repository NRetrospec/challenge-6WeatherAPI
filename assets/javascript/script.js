const searchFormEl = document.querySelector("#search-form");
const cityNameEl= document.querySelector("#city-name");
const apiKey = 'cf6b8ef31c485169dc6109681406854a'


function searchCity(event){
event.preventDefault();
}

searchFormEl.addEventListener("submit", searchCity)
