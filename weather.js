const API_KEY = "e731d4db4127ce26bf6940abd0bd2f4b"
const COORDS = "coords";

const weather = document.querySelector('.js-weather');

function saveCoords(coords) {
  localStorage.setItem(COORDS, JSON.stringify(coords));  
}

function handleGeoSuccess(position) {
  const coords = position.coords;
  const latitude = coords.latitude;
  const longitude = coords.longitude;

  const coordsObj = {
    latitude: latitude,
    longitude: longitude
  };

  saveCoords(coordsObj);
}

function handleGeoErr() {
  console.log("Can't access Geolocation!!");
}

/* 사용자 좌표 정보 요청 */
function askForCoords() { 
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoErr); // navigator api 사용
}

/* 사용자 좌표에 따른 날씨 정보 요청 */
function getWeather(coords) {
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
  ).then((response) => {
      return response.json();
  }).then((json) => {
    const temp = json.main.temp;
    const hum = json.main.humidity;
    const region = json.name;

    weather.innerHTML = `${temp}(${hum}) @ ${region}`  ;
  });

  
}

/* 좌표 받아오기 */
function loadCoords() {
  const loadedCoords = localStorage.getItem(COORDS);
  if (loadedCoords === null) {  // 저장된 좌표가 Local Storage에 없을ㅇ 경우
    localStorage.setItem(COORDS, coords);
  }
  const parseCoords = JSON.parse(loadedCoords); // Local Storage에 문자열로 저장되어 있는 데이터 파싱
  getWeather(parseCoords);  // 날씨 정보 받아오기
}

function init() {
  loadCoords();
}

init();