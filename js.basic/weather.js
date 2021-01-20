const weather = document.querySelector(".js-weather");
const API_KEY = "52210fb6e9bc385428293f430f25d2f3";
const COORDS = 'coords';

function getWeather(lat,lng){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
    )
    .then(function(response){ //api정보를 완전히 다 가져오면 송출
     return response.json();
    })
    .then(function(json){
        const temperature=json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}
 //fetch안에는 가져올 데이터가 들어가면 된다. 백틱 사용하기!! 

function saveCoords(coordsObj){
    localStorage.setItem(COORDS, JSON.stringify(coordsObj))
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude,   //latitude=latitude와 같은 효과를 낸다.
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitude,longitude)
}   

function handlesGeoError(){
    console.log("Cant access geo location")
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handlesGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords===null){
        askForCoords();
    }else{
        const parseCoords = JSON.parse(loadedCoords);
        getWeather(parseCoords.latitude, parseCoords.longitude)
    }
}

function init(){
    loadCoords();
}

init()